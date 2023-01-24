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

export declare type OnceClipboard = string

export declare type StoredClipboard = {
	time: number
	clipboard: OnceClipboard
}[]

export declare type clipboardData = {
	readContent: OnceClipboard
	usefulFormat: string[]
}
