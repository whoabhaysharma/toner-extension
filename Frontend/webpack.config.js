const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        background : './src/background.js',
        popup: './src/index.js', // React popup
        content: './src/content/loader.js', // Content script
    },
    output: {
        filename: '[name].js', // Name based on entry (popup.js, content.js, etc.)
        path: path.resolve(__dirname, 'extension'), // Output directory
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/popup/popup.html',
            filename: 'popup.html',
            chunks: ['popup'] // Only include popup.js in popup.html
        }),
        // new HtmlWebpackPlugin({
        //     template: './public/index.html',
        //     filename: 'index.html',
        //     chunks: ['content'] // Only include popup.js in popup.html
        // }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/manifest.json', to: '' }, // Copy manifest.json
            ]
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
