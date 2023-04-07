export type Point = { x: number; y: number };

function makePathPart({ x, y }: Point, index: number, points: Point[]): string {
	x = Math.round(x * 1000) / 1000;
	y = Math.round(y * 1000) / 1000;

	if (index === 0) {
		return `M${x},${y}`;
	} else if (index === points.length - 1) {
		return `L${x},${y} Z`;
	} else {
		return `L${x},${y}`;
	}
}

export function draw(width: number, height: number, points: Point[]): string {
	const path = points.map(makePathPart).join(' ');

	return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}px" height="${height}px">
  <path d="${path}" width="${width}px" height="${height}px" />
</svg>`;
}

export function drawClipPath(width: number, height: number, points: Point[]): string {
	const path = points
		.map(({ x, y }) => ({ x: x / width, y: y / height }))
		.map(makePathPart)
		.join(' ');

	return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <clipPath id="se-${width}x${height}-clip" clipPathUnits="objectBoundingBox">
      <path d="${path}" />
    </clipPath>  
  </defs>
</svg>`;
}
