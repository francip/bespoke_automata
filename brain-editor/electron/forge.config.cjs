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

module.exports = async (env, argv) => {
    const [electronConfigModule, appConfigModule, devServerModule] =
        await Promise.all([
            import("../webpack.electron.config.js"),
            import("../webpack.config.js"),
            import("../webpack.devserver.config.js"),
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
                            html: "../public/index.html",
                            js: "../src/app/index.tsx",
                            preload: {
                                js: "../src/electron/preload.ts",
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
