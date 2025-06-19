export const toRub = (value: number) =>
	value.toLocaleString("ru-RU", {
		style: "currency",
		currency: "RUB",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});
