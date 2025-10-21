const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: {
        app: "./assets/src/app.js",
        styles: "./assets/css/main.scss",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "assets/dist"),
        clean: true,
    },
    resolve: {
        modules: [path.resolve(__dirname, "node_modules"), "node_modules"],
    },
    devtool: "source-map",
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
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, "_sass")],
                                outputStyle: "compressed",
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "../fonts/[name][ext]",
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
        new MiniCssExtractPlugin({
            filename: "../css/[name].css",
        }),
    ],
};
