import { defaultLocalConfig } from "@/share"

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
