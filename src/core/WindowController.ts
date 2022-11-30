import { BrowserWindow } from "electron"

export class WindowController {
	private mainWindow: BrowserWindow | null = null

	constructor(window: BrowserWindow | null) {
		this.mainWindow = window
	}

	public listeningWindowPosition() {
		this.mainWindow?.on("move", () => {
			const newPosition = {
				x: this.mainWindow?.getPosition()[0],
				y: this.mainWindow?.getPosition()[1],
			}
			localStorage.setItem("position_x", newPosition.x?.toString() ?? "0")
			localStorage.setItem("position_y", newPosition.y?.toString() ?? "0")
		})
	}
}
