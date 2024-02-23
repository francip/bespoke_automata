const path = require("path");
const rules = require("./webpack.rules.cjs");
const plugins = require("./webpack.plugins.cjs");

const rendererConfig = {
    module: {
        rules,
    },
    plugins,
    resolve: {
        alias: {
            assets: path.resolve(__dirname, "assets"),
        },
        extensions: [
            ".js",
            ".ts",
            ".jsx",
            ".tsx",
            ".css",
            ".sass",
            ".scss",
            ".json",
        ],
    },
};

module.exports = rendererConfig;
