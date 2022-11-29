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

export function localStorageWindowPosition(position: Position) {
	const lx = localStorage.getItem("position_x")
	const ly = localStorage.getItem("position_y")

	if (lx === position.x.toString() && ly === position.y.toString()) return false
	else {
		localStorage.setItem("position_x", position.x.toString())
		localStorage.setItem("position_y", position.y.toString())
	}
}

export function getLocalStorageWindowPosition() {
	return {
		x: Number(localStorage.getItem("position_x")),
		y: Number(localStorage.getItem("position_y")),
	}
}
