const { MakerSquirrel } = require("@electron-forge/maker-squirrel");
const { MakerZIP } = require("@electron-forge/maker-zip");
const { MakerDeb } = require("@electron-forge/maker-deb");
const { MakerRpm } = require("@electron-forge/maker-rpm");
const {
    AutoUnpackNativesPlugin,
} = require("@electron-forge/plugin-auto-unpack-natives");
const { WebpackPlugin } = require("@electron-forge/plugin-webpack");
const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

const path = require("path");

module.exports = async (env, argv) => {
    const [electronConfigModule, appConfigModule, devServerModule] =
        await Promise.all([
            import(path.join(process.cwd(), "webpack.electron.config.js")),
            import(path.join(process.cwd(), "webpack.config.js")),
            import(path.join(process.cwd(), "webpack.devserver.config.js")),
        ]);

    const electronConfig = electronConfigModule.default;
    const appConfig = appConfigModule.default;
    const devServer = devServerModule.default;

    return {
        packagerConfig: {
            asar: true,
        },
        rebuildConfig: {},
        makers: [
            new MakerSquirrel({}),
            new MakerZIP({}, ["darwin"]),
            new MakerRpm({}),
            new MakerDeb({}),
        ],
        plugins: [
            new AutoUnpackNativesPlugin({}),
            new WebpackPlugin({
                mainConfig: electronConfig(env ?? process.env, argv),
                renderer: {
                    nodeIntegration: true,
                    config: appConfig(env ?? process.env, argv),
                    entryPoints: [
                        {
                            name: "app",
                            html: path.join(process.cwd(), "public/index.html"),
                            js: path.join(process.cwd(), "src/graphdash/index.tsx"),
                            preload: {
                                js: path.join(process.cwd(), "src/electron/preload.ts"),
                            },
                        },
                    ],
                },
                devServer: devServer(env ?? process.env, argv),
            }),
            new FusesPlugin({
                version: FuseVersion.V1,
                [FuseV1Options.RunAsNode]: false,
                [FuseV1Options.EnableCookieEncryption]: true,
                [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
                [FuseV1Options.EnableNodeCliInspectArguments]: false,
                [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
                [FuseV1Options.OnlyLoadAppFromAsar]: true,
            }),
        ],
    };
};
