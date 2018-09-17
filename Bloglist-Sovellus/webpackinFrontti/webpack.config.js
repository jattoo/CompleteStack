const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
    const backend_url = 'http://localhost:3003'
    return {
        entry : ['babel-polyfill','./src/index.js'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            compress: true,
            port: 3000,
            proxy: { '/api': backend_url }
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['env','react'],
                        plugins: [require('babel-plugin-transform-class-properties')]
                    }
                },
                {
                    test: /\.css$/,
                    loader: [
                        'style-loader',
                        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap&-minimize'
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ]
    }
}

module.exports = config
