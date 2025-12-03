let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-762008b27cff430289f9cb812010d371.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-31835f4925254f16ad9ce47bfe082f11.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-af52e145b46f4643840668ef5bf23952.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-e08ddc6efc2944bb84b7982b6e8825b4.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-a9a5f35f84584290a9de003cf86faf37.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-89ed998cc2bc412db543bb4b8c57e662.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-2634c5482cbc49329e9902214d332db6.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-518aef848a0fedd5af45166ce269f7cc.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-a74269ab9d1140f4b9b01e4b98c35bc7.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-b650344d00a64925b0ac01b33501589d.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-bef823910dc44973941ddebcc9ec07c8.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-def2005fbb5b4ebc9f95819a9c0fbcb3.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-ad061bfadf884f598139510ae71023ba.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-c9720308467542c7bced018c5417e470.r2.dev',
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ]
  }
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
