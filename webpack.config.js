const webpack = require("webpack");
const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: "./assets/src/app.js",
    output: {
        filename: "app.bundle.js",
        path: path.resolve(__dirname, "assets/js"),
    },
    resolve: {
        modules: [path.resolve(__dirname, "node_modules"), "node_modules"],
    },
    devtool: "source-map", // preferred in production
    mode: "production",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
        ],
    },
    externals: {
        jquery: "jQuery",
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
    ],
};
