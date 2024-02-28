import { __dirname__ } from "./webpack.dirname.config.js";
import rules from "./webpack.rules.config.js";
import plugins from "./webpack.plugins.config.js";

import path from 'path';

export default (env, argv) => {
    return {
        target: 'electron-main',
        entry: path.join(__dirname__, '/src/electron/index.ts'),
        resolve: {
            extensions: [
                '.js',
                '.ts',
                '.jsx',
                '.tsx',
                '.css',
                '.sass',
                '.scss',
                '.json',
            ],
            alias: {
                "@assets": path.join(__dirname__, "./assets/"),
                "@shared": path.join(__dirname__, "./src/shared/"),
                "@mui/material": "@mui/joy",
            },
        },
        output: {
            module: true,
            chunkFormat: 'module',
        },
        experiments: {
            outputModule: true,
        },
        module: {
            rules: rules(env, argv),
        },
        plugins: plugins(env, argv),
    };
};
