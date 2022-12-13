import { clipboard } from "@/utils"

export class ClipboardMonitor {
	private CLIPBOARD = clipboard
	private CLIPBOARD_QUEUE: string[] = []

	public getClipboard() {
		return this.CLIPBOARD.readText()
	}
}
