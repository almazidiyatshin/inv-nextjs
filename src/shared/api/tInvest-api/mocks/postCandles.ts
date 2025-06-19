import { getRandomBigInteger, getRandomInteger } from "../utils/common";

export const generateCandleData = (
	numberOfMonths: number,
	startDate = "2015-01-01T00:00:00Z",
) => {
	const data = [];
	const currentDate = new Date(startDate);

	for (let i = 0; i < numberOfMonths; i++) {
		const timeString = currentDate.toISOString();
		data.push({
			open: {
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			high: {
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			low: {
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			close: {
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			volume: (Math.random() * 1000000).toFixed(0),
			time: timeString,
			isComplete: true,
			candleSourceType: "CANDLE_SOURCE_EXCHANGE",
		});

		currentDate.setMonth(currentDate.getMonth() + 1);
	}

	return { candles: data };
};
