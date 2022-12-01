import { BrowserWindow, ipcRenderer } from "electron"

export class WindowController {
	private mainWindow: BrowserWindow | null = null

	constructor(window: BrowserWindow | null) {
		this.mainWindow = window
		this.listeningMovedPosition()
	}

	private listeningMovedPosition() {
		ipcRenderer.on("moved-position", (event, newPosition) => {
			localStorage.setItem("win-position", JSON.stringify(newPosition))
			console.log("moved a new position", newPosition)
		})
	}
}
