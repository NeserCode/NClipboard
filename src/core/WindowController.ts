import { BrowserWindow, ipcRenderer } from "electron"

export class WindowController {
	private mainWindow: BrowserWindow | null = null

	public listeningMovedPosition(callback?: () => void) {
		ipcRenderer.on("moved-position", (event, newPosition) => {
			localStorage.setItem("win-position", JSON.stringify(newPosition))
			console.log("moved a new position", newPosition)
			if (callback) callback()
		})
	}

	public listeningToggleMovement(callback?: () => void) {
		ipcRenderer.on("toggle-movement", () => {
			console.log("toggle movement")
			if (callback) callback()
		})
	}
}
