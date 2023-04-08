<script>
	import { generate } from '../ellipse';
	import { copy, download } from '../save';
	import { draw, drawClipPath } from '../svg';
	import InputRange from './InputRange.svelte';

	let width = 512;
	let height = 512;
	let power = 4;

	$: points = generate(width, height, power);
	$: display = draw(width, height, points);
</script>

<div class="px-2 py-6">
	<div class="bg-white shadow max-w-xl mx-auto p-8 rounded-xl">
		<div class="svg-container max-w-lg pb-2">
			{@html display}
		</div>

		<form class="flex flex-col gap-2 items-stretch">
			<InputRange bind:value={power} min="0.01" max="10" step="0.01" list="power-suggestions">Power (N)</InputRange>
			<datalist id="power-suggestions">
				<option value="0.5">Star</option>
				<option value="1">Diamond</option>
				<option value="2">Circle</option>
				<option value="3"></option>
				<option value="4"></option>
				<option value="5"></option>
				<option value="6"></option>
				<option value="7"></option>
				<option value="8"></option>
				<option value="9"></option>
				<option value="10"></option>
			</datalist>

			<InputRange bind:value={width} min="16" max="2048" step="1">Width</InputRange>
			<InputRange bind:value={height} min="16" max="2048" step="1">Height</InputRange>

			<fieldset>
				<legend>SVG</legend>
				<button
					type="button"
					on:click={() =>
						download(display, {
							mimeType: 'image/svg+xml',
							filename: `superellipse-${width}x${height}.svg`
						})}>Download</button
				>
				<button type="button" on:click={() => copy(display)}>Copy</button>
			</fieldset>

			<fieldset>
				<legend>SVG Clip Path</legend>
				<button
					on:click={() =>
						download(drawClipPath(width, height, points), {
							mimeType: 'image/svg+xml',
							filename: `superellipse-${width}x${height}.svg`
						})}>Download</button
				>
				<button on:click={() => copy(drawClipPath(width, height, points))}>Copy</button>
			</fieldset>

			<button
				type="button"
				class="rounded-lg"
				on:click={() => {
					power = 4;
					width = 512;
					height = 512;
				}}>Reset</button
			>
		</form>
	</div>
</div>

<style lang="postcss">
	fieldset {
		@apply grid grid-cols-2 grid-rows-2;
	}

	fieldset legend {
		@apply block col-span-2 w-full pb-1 font-semibold text-sm text-gray-800;
	}

	button {
		@apply bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 transition-colors text-white px-3 py-2 font-semibold border-2 border-r-0 border-blue-600;
	}

	fieldset button:first-of-type {
		@apply rounded-l-md;
	}

	fieldset button:last-of-type {
		@apply rounded-r-md border-r-2;
	}

	:global(body) {
		background-color: theme(colors.slate.50);
	}

	:global(.svg-container svg) {
		max-height: 512px;
		max-width: 100%;
	}

	:global(.svg-container path) {
		fill: theme(colors.blue.600);
	}
</style>
