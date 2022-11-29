import { defaultLocalConfig } from './defaultLocalConfig'

export const defaultWindowOptions = {
  ...defaultLocalConfig,
  resizable: true,
  frame: false,
  show: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
  }
}