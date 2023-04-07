export async function copy(text: string) {
	await navigator.clipboard.writeText(text);
}

export async function download(
	text: string,
	{ filename = undefined as string | undefined, mimeType = undefined as string | undefined } = {}
) {
	const blob = new Blob([text], { type: mimeType });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = filename || '';

	document.body.appendChild(link);
	link.click();
	link.remove();

	await new Promise((resolve) => setTimeout(resolve, 1000));
	URL.revokeObjectURL(url);
}
