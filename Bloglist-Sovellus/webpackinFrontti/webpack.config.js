const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const config = (env, argv) => {
    const backend_url = 'http://localhost:3003'
    return {
        entry : ['babel-polyfill','./src/index.js'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
            publicPath: '/'
        },
        devServer: {
            historyApiFallback: true,
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
                    loader: 
                        'style-loader!css-loader'
                    
                },
                {
                    test: /\.(ico|png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    loader: ['url-loader','file-loader']
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            }),
            new HtmlWebpackPlugin({
                template: 'dist/index.html',
                favicon: 'dist/favicon.ico'
            })
        ],
       
    }
}

module.exports = config