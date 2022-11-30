import { BrowserWindow } from "electron"

export class WindowController {
	private mainWindow: BrowserWindow | null = null

	constructor(window: BrowserWindow | null) {
		this.mainWindow = window
	}

	public listeningWindowPosition() {
		this.mainWindow?.on("move", () => {
			console.log("Window moved", {
				x: this.mainWindow?.getPosition()[0],
				y: this.mainWindow?.getPosition()[1],
			})
		})
	}
}
