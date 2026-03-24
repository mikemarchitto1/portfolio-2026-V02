"use client";

import * as React from "react";
import { useLayoutEffect, useRef } from "react";
import Script from "next/script";
import type { OpenAIChatKit, ThemeOption } from "@openai/chatkit";
import {
  ChatKit,
  useChatKit,
  type ChatKitControl,
  type UseChatKitOptions,
} from "@openai/chatkit-react";

import { type Theme, useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

/** Inter inside ChatKit’s iframe (does not inherit `app/layout.tsx` fonts). */
const CHATKIT_INTER_TYPOGRAPHY: NonNullable<ThemeOption["typography"]> = {
  fontFamily: "'Inter', system-ui, sans-serif",
  baseSize: 14,
  fontSources: [
    {
      family: "Inter",
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hiA.woff2",
      weight: "100 900",
      style: "normal",
      display: "swap",
    },
  ],
};

const CHATKIT_THEME_BY_SITE_THEME: Record<Theme, ThemeOption> = {
  light: {
    /**
     * `colorScheme: "dark"` + light hex avoids a black iframe canvas. Foreground must be dark on
     * light `surface.background` (greeting / primary text). Bubble vars: `globals.css` light scope.
     */
    colorScheme: "dark",
    density: "compact",
    radius: "soft",
    typography: CHATKIT_INTER_TYPOGRAPHY,
    color: {
      surface: {
        background: "#F5F5F6",
        foreground: "#171717",
      },
      accent: { primary: "#E5E5E5", level: 1 },
      grayscale: { hue: 210, tint: 7 },
    },
  },
  dark: {
    colorScheme: "dark",
    density: "compact",
    radius: "soft",
    typography: CHATKIT_INTER_TYPOGRAPHY,
    color: {
      surface: {
        /** Overridden with computed `getComputedStyle` from `bg-background` (matches chat sheet). */
        background: "#14161A",
        foreground: "#ffffff" /* --foreground */,
      },
      accent: { primary: "oklch(55% 0.02 264)" /* --accent */, level: 0 },
      grayscale: { hue: 0, tint: 0 },
    },
  },
  color: {
    colorScheme: "dark",
    density: "compact",
    radius: "soft",
    typography: CHATKIT_INTER_TYPOGRAPHY,
    color: {
      surface: {
        background: "#13241C",
        foreground: "#ffffff" /* light text */,
      },
      accent: { primary: "ffffff", level: 0 },
      grayscale: { hue: 0, tint: 0 },
    },
  },
};

const ChatKitControlContext = React.createContext<ChatKitControl | null>(null);

/** Resolved `getComputedStyle` for the chat sheet panel (same utility classes as `SheetContent`). */
const ResolvedChatPanelBgContext = React.createContext<string | null>(null);

export function useChatKitControl(): ChatKitControl {
  const ctx = React.useContext(ChatKitControlContext);
  if (!ctx) {
    throw new Error("useChatKitControl must be used within ChatKitProvider");
  }
  return ctx;
}

/**
 * Same RGB(A) as `SheetContent`: `bg-background color:bg-sidebar-background` (matches chat-panel.tsx).
 * ChatKit `surface.background` + shadow iframe need this — guessed hex/oklch often won’t match pixels.
 */
function useResolvedChatPanelBackground(): string | null {
  const { theme } = useTheme();
  const [resolved, setResolved] = React.useState<string | null>(null);

  React.useLayoutEffect(() => {
    if (typeof document === "undefined") return;

    const probe = document.createElement("div");
    probe.className = "bg-background color:bg-sidebar-background";
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:fixed;left:-9999px;top:0;width:1px;height:1px;pointer-events:none;opacity:0;";
    document.body.appendChild(probe);

    const bg = getComputedStyle(probe).backgroundColor;
    document.body.removeChild(probe);

    if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
      setResolved(bg);
    }
  }, [theme]);

  return resolved;
}

const CHATKIT_USER_STORAGE_KEY = "portfolio_chatkit_user_id";

function getOrCreateChatKitUserId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(CHATKIT_USER_STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(CHATKIT_USER_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return `anon-${crypto.randomUUID()}`;
  }
}

/**
 * If set (e.g. `/api/chat`), ChatKit uses your custom completions URL + domain key (DeepSeek, etc.).
 * If unset, ChatKit uses OpenAI-hosted workflow sessions (`OPENAI_API_KEY` + `WORKFLOW_ID` on the server).
 */
function getCustomChatApiUrl(): string {
  return process.env.NEXT_PUBLIC_CHATKIT_CUSTOM_API_URL?.trim() ?? "";
}

/**
 * ChatKit is one web component (`<openai-chatkit>`) that includes transcript + composer.
 * `Chat` / `Composer` here are thin layout wrappers; Composer is a no-op slot.
 */
export function ChatKitProvider({ children }: { children: React.ReactNode }) {
  const { theme: siteTheme } = useTheme();
  const domainKey =
    process.env.NEXT_PUBLIC_CHATKIT_DOMAIN_KEY?.trim() ?? "";
  const customApiUrl = getCustomChatApiUrl();
  const resolvedPanelBg = useResolvedChatPanelBackground();

  const options: UseChatKitOptions = React.useMemo(() => {
    const base = CHATKIT_THEME_BY_SITE_THEME[siteTheme];

    const themeOption = base;

    const useCustomBackend = customApiUrl !== "";

    const api = useCustomBackend
      ? {
          url: customApiUrl,
          domainKey,
        }
      : {
          getClientSecret: async (_currentClientSecret: string | null) => {
            const user = getOrCreateChatKitUserId();
            const res = await fetch("/api/chatkit/session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ user }),
            });
            const data = (await res.json().catch(() => null)) as {
              client_secret?: string;
              error?: unknown;
            } | null;
            if (!res.ok || !data?.client_secret) {
              const msg =
                typeof data?.error === "string"
                  ? data.error
                  : "Could not start ChatKit session";
              throw new Error(msg);
            }
            return data.client_secret;
          },
        };

    return {
      api,
      theme: themeOption,
      header: { enabled: false },
      startScreen: {
        greeting: "Hello, what can I help you with today?",
        prompts: [],
      },
      composer: {
        placeholder: "Type a message…",
      },
      threadItemActions: {
        feedback: false,
      },
    };
  }, [customApiUrl, domainKey, siteTheme]);

  const kit = useChatKit(options);

  const showDomainKeyWarning = customApiUrl !== "" && !domainKey;

  return (
    <ChatKitControlContext.Provider value={kit.control}>
      <ResolvedChatPanelBgContext.Provider value={resolvedPanelBg}>
        <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col">
          {showDomainKeyWarning ? (
            <div
              role="status"
              className="mx-4 mb-2 shrink-0 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-left text-sm text-amber-950 dark:border-amber-400/35 dark:bg-amber-400/10 dark:text-amber-50"
            >
              {process.env.NODE_ENV === "development" ? (
                <>
                  <strong className="font-medium">ChatKit needs a domain key.</strong> Add{" "}
                  <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs dark:bg-white/10">
                    NEXT_PUBLIC_CHATKIT_DOMAIN_KEY
                  </code>{" "}
                  to{" "}
                  <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs dark:bg-white/10">
                    .env.local
                  </code>{" "}
                  (from OpenAI ChatKit domain registration for this site), then restart{" "}
                  <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs dark:bg-white/10">
                    npm run dev
                  </code>
                  .
                </>
              ) : (
                <>
                  Chat is unavailable right now. If you are the site owner, configure the
                  ChatKit domain key for this deployment.
                </>
              )}
            </div>
          ) : null}
          <Script
            src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
            strategy="afterInteractive"
          />
          {children}
        </div>
      </ResolvedChatPanelBgContext.Provider>
    </ChatKitControlContext.Provider>
  );
}

export type ChatProps = Omit<React.ComponentProps<typeof ChatKit>, "control">;

const CHATKIT_SHADOW_IFRAME_STYLE_ID = "chatkit-host-iframe-bg";

export function Chat(props: ChatProps) {
  const control = useChatKitControl();
  const { theme } = useTheme();
  const resolvedPanelBg = React.useContext(ResolvedChatPanelBgContext);
  const hostRef = useRef<OpenAIChatKit | null>(null);
  const { className, style, ...rest } = props;

  /** Page CSS cannot target `.ck-iframe` inside the component shadow root; inject a style tag. */
  useLayoutEffect(() => {
    const iframeBg =
      resolvedPanelBg ??
      (theme === "color" ? "var(--sidebar-background)" : "var(--background)");

    const apply = () => {
      const el = hostRef.current;
      if (!el?.shadowRoot) return false;

      let styleEl = el.shadowRoot.querySelector(
        `style#${CHATKIT_SHADOW_IFRAME_STYLE_ID}`
      ) as HTMLStyleElement | null;
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = CHATKIT_SHADOW_IFRAME_STYLE_ID;
        el.shadowRoot.appendChild(styleEl);
      }
      styleEl.textContent = `
        .ck-iframe {
          background-color: ${iframeBg} !important;
        }
      `;
      return true;
    };

    if (apply()) return;
    const id = requestAnimationFrame(() => {
      apply();
    });
    return () => cancelAnimationFrame(id);
  }, [theme, resolvedPanelBg]);

  const hostBackground =
    resolvedPanelBg ??
    (theme === "color" ? "var(--sidebar-background)" : "var(--background)");

  return (
    <ChatKit
      {...rest}
      ref={hostRef}
      control={control}
      className={cn(
        "p-0 m-0 shadow-none border-0 ring-0 outline-none",
        "min-h-0 w-full max-w-none",
        className
      )}
      style={{ background: hostBackground, ...style }}
    />
  );
}

/** Optional layout slot; ChatKit’s composer lives inside the iframe. */
export function Composer(_props: { className?: string }) {
  return null;
}
