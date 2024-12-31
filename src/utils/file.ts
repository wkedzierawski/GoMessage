export class Files {
	public static parse = (file: File) => {
		return file.arrayBuffer();
	};

	public static arrayBufferToBase64(buffer: ArrayBuffer) {
		let binary = "";
		const bytes = new Uint8Array(buffer);
		const len = bytes.byteLength;
		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}

	public static blob = (file: File | ArrayBuffer) => {
		return file instanceof Blob ? file : new Blob([new Uint8Array(file)]);
	};

	public static makeSource = (file: File | ArrayBuffer) =>
		URL.createObjectURL(Files.blob(file));
}
