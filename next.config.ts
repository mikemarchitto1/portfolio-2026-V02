import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/nutrilucent",
        destination: "/projects/nutrilucent",
        permanent: true,
      },
      {
        source: "/projects/project-one",
        destination: "/projects/glorifi",
        permanent: true,
      },
      {
        source: "/projects/project-two",
        destination: "/projects/microsofthits",
        permanent: true,
      },
      {
        source: "/projects/project-three",
        destination: "/projects/eddiebauer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
