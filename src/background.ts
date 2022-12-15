"use strict"

import { app, protocol, BrowserWindow, globalShortcut, ipcMain } from "electron"
import { createProtocol } from "vue-cli-plugin-electron-builder/lib"
import { debounce } from "ts-debounce"

const isDevelopment = process.env.NODE_ENV !== "production"

// Config Monitor
import { ConfigMonitor } from "@/core/ConfigMonitor"
const configMonitor = new ConfigMonitor()

const { width, height, x, y } = configMonitor.getLocalConfig()

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: "app", privileges: { secure: true, standard: true } },
])

async function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		width,
		height,
		x,
		y,
		resizable: false,
		transparent: true,
		frame: false,
		alwaysOnTop: true,
		skipTaskbar: true,
		// show: false,
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: process.env
				.ELECTRON_NODE_INTEGRATION as unknown as boolean,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
			enableRemoteModule: true,
			webSecurity: false,
		},
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		// await win.loadURL("http://localhost:8080/#/about")
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)

		// if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol("app")
		// Load the index.html when not in development
		win.loadURL("app://./index.html")
	}

	globalShortcut.register(
		"CommandOrControl+Q",
		debounce(() => {
			if (win.isFocused()) win.reload()
		}, 200)
	)
	globalShortcut.register(
		"CommandOrControl+E",
		debounce(() => {
			win.webContents.isDevToolsOpened()
				? win.webContents.closeDevTools()
				: win.webContents.openDevTools()
		}, 200)
	)
	globalShortcut.register(
		"CommandOrControl+D",
		debounce(() => {
			win.webContents.send("toggle-dark-mode")
		}, 200)
	)
	globalShortcut.register(
		"CommandOrControl+M",
		debounce(() => {
			if (win.isFocused()) win.webContents.send("toggle-movement")
		}, 200)
	)

	win.on("moved", () => {
		const newPosition = {
			x: win.getPosition()[0],
			y: win.getPosition()[1],
		}
		win.webContents.send("moved-position", newPosition)
	})

	win.once("ready-to-show", () => {
		win.show()
	})
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit()
	}
})

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
	createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === "win32") {
		process.on("message", (data) => {
			if (data === "graceful-exit") {
				app.quit()
			}
		})
	} else {
		process.on("SIGTERM", () => {
			app.quit()
		})
	}
}
