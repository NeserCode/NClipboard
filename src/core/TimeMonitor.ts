interface TimeInterface {
	milliseconds: number
	seconds: number
	minutes: number
	hours: number
	localTime: string
	localDate: string
	year: number
	month: number
	day: number
	week: number
	weekString: string
}

export class TimeMonitor {
	private TIME: TimeInterface = this.initialTime()
	private Timer: NodeJS.Timeout | null = null

	constructor() {
		this.IntervalTimerUpdate()
	}

	private initialTime(): TimeInterface {
		const date = new Date()
		return {
			milliseconds: date.getMilliseconds(),
			seconds: date.getSeconds(),
			minutes: date.getMinutes(),
			hours: date.getHours(),
			localTime: date.toLocaleTimeString(),
			localDate: date.toLocaleDateString(),
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate(),
			week: date.getDay(),
			weekString: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
				date.getDay()
			],
		}
	}

	private updateTime() {
		const date = new Date()
		this.TIME = {
			milliseconds: date.getMilliseconds(),
			seconds: date.getSeconds(),
			minutes: date.getMinutes(),
			hours: date.getHours(),
			localTime: date.toLocaleTimeString(),
			localDate: date.toLocaleDateString(),
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate(),
			week: date.getDay(),
			weekString: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
				date.getDay()
			],
		}
	}

	public getTime(): TimeInterface {
		return this.TIME
	}

	private IntervalTimerUpdate() {
		this.Timer = setInterval(() => {
			this.updateTime()
		}, 1)
	}

	public destoryTimer() {
		if (this.Timer) clearInterval(this.Timer)
	}
}
