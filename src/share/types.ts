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
