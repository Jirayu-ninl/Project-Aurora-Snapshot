// @ts-check
await import('./global/env.mjs')
/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
import 'dotenv/config'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { createRequire } from 'node:module'
import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache.js'
import plugins from 'next-compose-plugins'
import { withSentryConfig } from '@sentry/nextjs'
import { withAxiom } from 'next-axiom'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const nextConfig = {
  webpack: (config, { webpack, /*dev ,*/ isServer }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    )

    config.resolve.alias['@aurora'] = path.join(__dirname, 'aurora')
    config.resolve.alias['@app'] = path.join(__dirname, 'app')
    config.resolve.alias['@global'] = path.join(__dirname, 'global')
    config.resolve.alias['@components'] = path.join(__dirname, 'app/components')
    config.resolve.alias['@contents'] = path.join(__dirname, 'app/contents')
    config.resolve.alias['@server'] = path.join(__dirname, 'server')
    // config.resolve.alias['public'] = path.join(__dirname, 'public')

    config.resolve.alias['auroraGL'] = path.resolve(
      __dirname,
      'aurora/libs/webGL/glsl',
    )

    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.mp4$/,
      use: ['file-loader'],
    })

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag|ps)$/,
      exclude: /node_modules/,
      use: ['glslify-import-loader', 'raw-loader', 'glslify-loader'],
    })
    config.module.rules.push({
      test: /\.hlsl$/i,
      exclude: /node_modules/,
      use: ['@gdgt/hlsl-loader'],
    })

    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // domains: [
    //   'media.graphcms.com',
    //   'media.hygraph.com',
    //   'media.graphassets.com',
    //   'images.prismic.io',
    //   'avatars.githubusercontent.com',
    //   'platform-lookaside.fbsbx.com',
    //   'lh3.googleusercontent.com',
    //   's3.theiceji.com',
    //   '129.213.124.156',
    //   'assets.theiceji.com',
    //   'scontent.fbkk28-1.fna.fbcdn.net',
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '129.213.124.156',
      },
    ],
  },
  pwa: {
    dest: 'public',
    register: true,
    runtimeCaching,
  },
  sentry: {
    hideSourceMaps: true,
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
}

// manage i18n
// if (process.env.EXPORT !== 'true') {
//   nextConfig.i18n = {
//     locales: ['en-US'],
//     defaultLocale: 'en-US',
//   }
// }

export default plugins(
  [
    withAxiom,
    [withSentryConfig, sentryWebpackPluginOptions],
    withBundleAnalyzer,
    withPWA,
  ],
  nextConfig,
)
