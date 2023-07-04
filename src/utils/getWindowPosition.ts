import { defaultLocalConfig } from "@/share"
import { remote } from "electron"

interface Position {
	x: number
	y: number
}

interface bounds extends Position {
	width: number
	height: number
}

export function getMainWindowBounds(): bounds {
	const remoteWindow = remote.getCurrentWindow()
	const position = remoteWindow.getPosition()
	const size = remoteWindow.getSize()
	return { x: position[0], y: position[1], width: size[0], height: size[1] }
}

export function getWindowPosition(): Position {
	const position = localStorage.getItem("win-position")
	if (position) {
		const { x, y } = JSON.parse(position)
		return { x, y }
	} else return { x: defaultLocalConfig.x, y: defaultLocalConfig.y }
}

// get the screen size
export function getScreenUsable() {
	const display = remote.screen.getPrimaryDisplay()

	return { ...display.workArea }
}
