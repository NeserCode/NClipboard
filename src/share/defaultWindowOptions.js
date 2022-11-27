export const defaultWindowOptions = {
  width: 800,
  height: 600,
  resizable: true,
  frame: false,
  show: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
    webSecurity: false,
  }
}