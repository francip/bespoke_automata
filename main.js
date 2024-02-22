const { app, BrowserWindow } = require('electron')

// app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('disable-gpu-rasterization');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

const createWindow = () => {
  const win = new BrowserWindow({show: false});
  win.maximize();
  // set icon
  //win.setIcon('icon.svg')
   //win.removeMenu();
  win.loadFile('index.html')
  win.show();
}

app.whenReady().then(() => {
  createWindow()
})