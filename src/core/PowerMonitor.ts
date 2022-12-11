import { remote } from "@/utils"
import { RemoteNavigator, PowerInterface } from "@/share"

import { $Bus } from "@/utils"

export class PowerMonitor {
	private POWER: PowerInterface = this.initialPower()
	private navigator: RemoteNavigator | null = null

	constructor(navigator: RemoteNavigator) {
		this.navigator = navigator
		this.IntervalPowerUpdate()
	}

	private initialPower(): PowerInterface {
		const powerState = remote.powerMonitor.getSystemIdleState(1)
		return {
			state: powerState,
			percentage: -1,
			isCharging: false,
			chargingTime: -1,
			dischargingTime: -1,
		}
	}

	private updatePowerPercentage() {
		if (this.navigator)
			this.navigator.getBattery().then((battery) => {
				this.POWER.percentage = battery.level * 100
			})
	}

	private updatePowerState() {
		const powerState = remote.powerMonitor.getSystemIdleState(1)
		this.POWER.state = powerState
	}

	private updatePowerCharging() {
		if (this.navigator)
			this.navigator.getBattery().then((battery) => {
				this.POWER.isCharging = battery.charging
				this.POWER.chargingTime = battery.chargingTime
				this.POWER.dischargingTime = battery.dischargingTime
			})
	}

	private updatePower() {
		this.updatePowerPercentage()
		this.updatePowerState()
		this.updatePowerCharging()
		$Bus.emit("power-update")
	}

	public getPower(): PowerInterface {
		return this.POWER
	}

	private IntervalPowerUpdate() {
		setInterval(() => {
			this.updatePower()
		}, 100)
	}
}
