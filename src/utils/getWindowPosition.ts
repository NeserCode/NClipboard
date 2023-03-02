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

// get y offset: window who
export function getcomputedScreenYOffset(
	offset: number,
	WindowHeight: number,
	BodyHeight: number
) {
	const { y } = getWindowPosition()
	const { height } = remote.screen.getPrimaryDisplay().workAreaSize
	// in bottom
	if (y + BodyHeight + offset + WindowHeight > height)
		return y - offset - WindowHeight
	// in top
	else return y + BodyHeight + offset
}
