const rules = require("./webpack.rules.cjs");
const plugins = require("./webpack.plugins.cjs");

const mainConfig = {
    entry: "./src/main.ts",
    module: {
        rules,
    },
    plugins,
    resolve: {
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

module.exports = mainConfig;
