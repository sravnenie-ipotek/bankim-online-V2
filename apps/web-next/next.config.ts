import type { NextConfig } from 'next'
import path from 'path'

const webSrc = path.resolve(__dirname, '../web/src')
const nextHooks = path.resolve(__dirname, 'src/hooks')

const nextConfig: NextConfig = {
  // Allow importing source files from the existing Vite app during migration
  // (still needed for Redux store import in StoreProvider)
  experimental: {
    externalDir: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },

  // Ignore TS errors from legacy ../web/src imports during migration.
  typescript: {
    ignoreBuildErrors: true,
  },

  // Transpile packages that ship untranspiled code
  transpilePackages: [
    '@mui/material',
    '@mui/system',
    '@mui/icons-material',
    '@emotion/react',
    '@emotion/styled',
  ],

  // Turbopack config (Next.js 16 default bundler)
  turbopack: {
    resolveAlias: {
      // Only @src alias kept for Redux store dependency
      '@src': webSrc,
      '@hooks': nextHooks,
    },
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Webpack fallback config (for `next build --webpack` or older environments)
  webpack(config) {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      // Only @src alias kept for Redux store dependency
      '@src': webSrc,
      '@hooks': nextHooks,
    }

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default nextConfig
