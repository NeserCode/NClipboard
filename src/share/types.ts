import Electron from "electron"

export declare interface PowerInterface {
	state: string
	percentage: number
	isCharging: boolean
	chargingTime: number
	dischargingTime: number
}

export declare interface RemoteNavigator extends Navigator {
	getBattery: () => Promise<{
		charging: boolean
		chargingTime: number
		dischargingTime: number
		level: number
	}>
}

export declare type OnceClipboard = string | Electron.ReadBookmark

export declare type StoredClipboard = OnceClipboard[]
