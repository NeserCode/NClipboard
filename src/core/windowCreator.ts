import { remote } from "electron"
import type {
	BrowserWindowConstructorOptions,
	BrowserWindow as BrowserWindowType,
} from "electron"

import { defaultWindowOptions } from "../share/defaultWindowOptions"
import { debounce } from "ts-debounce"

const { BrowserWindow } = remote
const isDevelopment = process.env.NODE_ENV !== "production"

function assignOptions<T extends object>(opt1: T, opt2: T): T {
	return Object.assign(opt1, opt2)
}

export class WindowCreator {
	private mainWindow: BrowserWindowType | null = null

	constructor(opt: BrowserWindowConstructorOptions, url: string) {
		this.createMainWindow(opt, url)
	}

	public async createMainWindow(
		opt: BrowserWindowConstructorOptions,
		url: string
	): Promise<void> {
		this.mainWindow = new BrowserWindow(
			assignOptions(defaultWindowOptions, opt)
		)
		if (isDevelopment)
			await this.mainWindow.loadURL(
				url ? `http://localhost:8080${url}` : `http://localhost:8080`
			)
		else
			await this.mainWindow.loadURL(
				url ? `app://./index.html${url}` : `app://./index.html`
			)
		// this.mainWindow.webContents.openDevTools()
		console.log(
			"Creator created a window",
			assignOptions(defaultWindowOptions, opt),
			opt
		)

		this.mainWindow.on("closed", () => {
			this.mainWindow = null
		})

		remote.globalShortcut.register(
			"CommandOrControl+Space",
			debounce(() => {
				if (this.mainWindow) {
					this.mainWindow.setAlwaysOnTop(true)
					this.mainWindow.focus()
					this.mainWindow.setAlwaysOnTop(false)
				}
			}, 200)
		)

		remote.globalShortcut.register(
			"CommandOrControl+E",
			debounce(() => {
				if (this.mainWindow) {
					this.mainWindow.webContents.isDevToolsOpened()
						? this.mainWindow.webContents.closeDevTools()
						: this.mainWindow.webContents.openDevTools()
				}
			}, 200)
		)

		// this.mainWindow.webContents.openDevTools()
	}

	getWindow(): BrowserWindowType | null {
		return this.mainWindow
	}

	openWindow(): void {
		this.mainWindow?.show()
	}

	closeWindow(): void {
		this.mainWindow?.close()
	}
}
