const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const plugins = [
    new ForkTsCheckerWebpackPlugin({
        typescript: {
            diagnosticOptions: {
                semantic: true,
                syntactic: true,
            },
            mode: "write-references",
        },
        logger: "webpack-infrastructure",
    }),
];

module.exports = plugins;
