import { defaultLocalConfig } from './defaultLocalConfig'

export const defaultWindowOptions = {
  ...defaultLocalConfig,
  resizable: false,
  frame: false,
  show: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
  }
}