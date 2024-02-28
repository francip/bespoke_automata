import { __dirname__ } from "./webpack.dirname.config.js";
import rules from "./webpack.rules.config.js";
import plugins from "./webpack.plugins.config.js";
import devServer from "./webpack.devserver.config.js";

import path from "path";

import TerserPlugin from "terser-webpack-plugin";

export function config(env, argv) {
    return {
        target: ["web", "electron-renderer"],
        entry: path.join(__dirname__, "./src/app/index.tsx"),
        resolve: {
            extensions: [
                ".tsx",
                ".ts",
                ".jsx",
                ".js",
                ".css",
                ".sass",
                ".scss",
                ".json",
            ],
            alias: {
                "@app": path.join(__dirname__, "./src/app/"),
                "@shared": path.join(__dirname__, "./src/shared/"),
                "@assets": path.join(__dirname__, "./assets/"),
                "@mui/material": "@mui/joy",
            },
        },
        output: {
            clean: true,
            path: path.join(__dirname__, "/dist"),
            filename:
                argv?.mode === "production"
                    ? "bundle.[contenthash].js"
                    : "bundle.js",
        },
        stats: "normal",
        optimization: {
            minimize: argv?.mode === "production",
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        ecma: 2020,
                        compress: { drop_console: true },
                        output: { comments: false, beautify: false },
                    },
                }),
            ],
        },
        performance: {
            maxAssetSize: 1500000,
            maxEntrypointSize: 1500000,
        },
        devtool: argv?.mode === "production" ? undefined : "eval-source-map",
        devServer: devServer(env, argv),
        module: {
            rules: rules(env, argv),
        },
        plugins: plugins(env, argv),
    };
}

export default config;
