import { remote } from "electron"

interface Position {
	x: number
	y: number
}

export function getWindowPosition(): Position {
	return {
		x: remote.getCurrentWindow().getPosition()[0],
		y: remote.getCurrentWindow().getPosition()[1],
	}
}
