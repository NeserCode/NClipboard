import { defaultLocalConfig } from "@/share"
import { remote } from "electron"

interface Position {
	x: number
	y: number
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
	const { width, height } = display.workAreaSize
	const { x, y } = display.workArea
	console.log(display)

	return { x, y, width, height }
}
