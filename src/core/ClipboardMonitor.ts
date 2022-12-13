import { clipboard } from "@/utils"

export class ClipboardMonitor {
	private CLIPBOARD = clipboard

	public getClipboard() {
		const containsString = this.CLIPBOARD.availableFormats()
			.join("/")
			.split("/")

		if (containsString.includes("text"))
			return {
				readContent: this.CLIPBOARD.readText(),
				usefulFormat: this.CLIPBOARD.availableFormats(),
			}
		else if (containsString.includes("image"))
			return {
				readContent: this.CLIPBOARD.readImage(),
				usefulFormat: this.CLIPBOARD.availableFormats(),
			}
		else if (containsString.includes("html"))
			return {
				readContent: this.CLIPBOARD.readHTML(),
				usefulFormat: this.CLIPBOARD.availableFormats(),
			}
		else if (containsString.includes("rtf"))
			return {
				readContent: this.CLIPBOARD.readRTF(),
				usefulFormat: this.CLIPBOARD.availableFormats(),
			}
		else if (containsString.includes("bookmark"))
			return {
				readContent: this.CLIPBOARD.readBookmark(),
				usefulFormat: this.CLIPBOARD.availableFormats(),
			}
		else
			return {
				readContent: this.CLIPBOARD.readText(),
				usefulFormat: this.CLIPBOARD.availableFormats(),
			}
	}

	private listeningClipboard(callback?: (data: string) => void) {
		this.CLIPBOARD.availableFormats().forEach((format) => {
			console.log(format, this.CLIPBOARD.read(format))
		})
	}
}
