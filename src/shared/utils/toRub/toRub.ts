export const toRub = (value: number, fractionDigits = 0) =>
	value.toLocaleString("ru-RU", {
		style: "currency",
		currency: "RUB",
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits,
	});
