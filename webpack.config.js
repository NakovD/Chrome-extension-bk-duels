const path = require('path');

module.exports = {
    entry: {
        contentScripts: './src/content-scripts/content.ts',
        backgroundScripts: './src/background-scripts/background.ts',
        extensionScripts: "./src/extension-scripts/popup.ts"
    },
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    }
};