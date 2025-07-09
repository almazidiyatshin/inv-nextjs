import * as cheerio from "cheerio";
import type { TIndicatorData } from "../types/indicators";

export const getIndicators = async () => {
	const response = await fetch("https://cbr.ru", {
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error("Ошибка при получении индикаторов");
	}

	const html = await response.text();

	const $ = cheerio.load(html);

	const indicators: TIndicatorData[] = [];
	$("div.main-indicator_value").each((_i, element) => {
		const value = $(element).text().trim();
		indicators.push({ value });
	});

	const [, inflationRate, keyRate] = indicators;

	return [inflationRate.value, keyRate.value];
};
