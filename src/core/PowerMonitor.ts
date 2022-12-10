import { remote } from "@/utils"
import { RemoteNavigator, PowerInterface } from "@/share"

export class PowerMonitor {
	private POWER: Promise<PowerInterface> = this.initialPower()
	private navigator: RemoteNavigator | null = null

	constructor(navigator: RemoteNavigator) {
		this.IntervalPowerUpdate()
		this.navigator = navigator
	}

	private async initialPower(): Promise<PowerInterface> {
		const powerState = remote.powerMonitor.getSystemIdleState(1)
		let percentage = -1
		if (this.navigator)
			this.navigator.getBattery().then((battery) => {
				percentage = battery.level * 100
			})
		return {
			state: powerState,
			percentage,
		}
	}

	private updatePower() {
		this.initialPower()
	}

	public async getPower(): Promise<PowerInterface> {
		return this.POWER
	}

	private IntervalPowerUpdate() {
		setInterval(() => {
			this.updatePower()
		}, 1000)
	}
}
