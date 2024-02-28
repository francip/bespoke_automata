import { app, BrowserWindow } from "electron";

declare const APP_WEBPACK_ENTRY: string;
declare const APP_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = (): void => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: APP_PRELOAD_WEBPACK_ENTRY,
            // Enable Node.js integration in the renderer process
            // Read about the security risks here:
            // https://electronjs.org/docs/tutorial/security
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL(APP_WEBPACK_ENTRY);

    mainWindow.maximize();

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
