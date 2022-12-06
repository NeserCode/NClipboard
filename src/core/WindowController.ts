import { BrowserWindow, ipcRenderer } from "electron"

export class WindowController {
	private mainWindow: BrowserWindow | null = null

	constructor() {
		this.initialDarkmode()
	}

	public listeningMovedPosition(callback?: () => void) {
		ipcRenderer.on("moved-position", (event, newPosition) => {
			localStorage.setItem("win-position", JSON.stringify(newPosition))
			console.log("Reciver:moved a new position", newPosition)
			if (callback) callback()
		})
	}

	public listeningToggleMovement(callback?: () => void) {
		ipcRenderer.on("toggle-movement", () => {
			console.log("Reciver:toggle movement")
			if (callback) callback()
		})
	}

	public listeningToggleDarkmode(callback?: () => void) {
		ipcRenderer.on("toggle-dark-mode", () => {
			console.log("Reciver:toggle dark mode")
			if (callback) callback()
		})
	}

	private initialDarkmode() {
		const darkmode = localStorage.getItem("dark-mode")
		if (JSON.parse(darkmode ?? "false"))
			document.querySelector("html")?.classList.add("dark")
	}
}
