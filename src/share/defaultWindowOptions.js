import { ConfigMonitor } from "@/core/ConfigMonitor"
const configMonitor = new ConfigMonitor()

const { width, height } = configMonitor.getRemoteLocalConfig()

export const defaultWindowOptions = {
  width, height,
  resizable: true,
  frame: false,
  show: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
  }
}