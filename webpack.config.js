const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env) => {

    return {
        mode: 'development',
        entry: './src/client/index.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.jpe?g$|\.png$/,
                    loader: 'file-loader',
                    options: {
                        name: './image/[name].[ext]'
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Buch Suchmaschine',
                filename: './index.html',
                template: 'src/client/assets/html/index_template.html'
            })
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: 'js/index.js',
            path: path.resolve(__dirname, 'public')
        }
    }
}