import type { Point } from './svg';

const normalize = (x: number, axis: number) => (axis - x) / 2 + x;
const signedPow = (x: number, power: number) => Math.abs(x) ** power * (x < 0 ? -1 : 1);

export function generate(width: number, height: number, n: number) {
	const step = (width + height) * 2;
	const dots = new Array<Point>(step);
	const piece = (Math.PI * 2) / step;
	const na = 2 / n;

	const calculate = (value: number, limit: number) =>
		normalize(signedPow(value, na) * limit, limit);

	for (let index = 0, t = 0; index <= step; index++, t += piece) {
		dots[index] = { x: calculate(Math.cos(t), width), y: calculate(Math.sin(t), height) };
	}

	return dots;
}
