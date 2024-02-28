function rules() {
    return [
        {
            // We're specifying native_modules in the test because the asset relocator loader generates a
            // "fake" .node file which is really a cjs file.
            test: /native_modules[/\\].+\.node$/,
            use: "node-loader",
        },
        // {
        //     test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
        //     parser: { amd: false },
        //     use: {
        //         loader: "@vercel/webpack-asset-relocator-loader",
        //         options: {
        //             outputAssetBase: "native_modules",
        //         },
        //     },
        // },
        {
            test: /\.(j|t)sx?$/,
            exclude: [/node_modules/, /\.webpack/],
            use: ["babel-loader", "ts-loader"],
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            type: 'asset/resource',
            // loader: "url-loader",
            // options: { limit: false },
        },
    ];
}

export default rules;
