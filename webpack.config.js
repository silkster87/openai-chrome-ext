import path from 'path'
import HTMLPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export default {
  entry: {
    popup: path.resolve('./src/App.tsx'),
    index: './src/index.tsx'
  },
  mode: 'production',
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: { noEmit: false }
            }
          }],
        exclude: /node_modules/
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: '../manifest.json' }
      ]
    }),
    ...getHtmlPlugins(['index']),
    new Dotenv()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks (chunk) {
        return chunk.name !== 'contentScript'
      }
    }
  }
}

function getHtmlPlugins (chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: 'React extension',
        filename: `${chunk}.html`,
        chunks: [chunk]
      })
  )
}
