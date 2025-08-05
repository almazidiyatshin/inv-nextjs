import * as cheerio from "cheerio";

import { parseStringPromise } from "xml2js";
import type { TExchangeRateValuteItem, TIndicatorData } from "../types/cbr";

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

export const getUsdExchangeRate = async () => {
	const today = new Date().toLocaleDateString("ru-RU").replace(/\//g, ".");
	const response = await fetch(
		`https://www.cbr.ru/scripts/XML_daily.asp?date_req=${today}`,
		{
			cache: "no-store",
		},
	);

	if (!response.ok) {
		throw new Error("Ошибка при получении курса валют");
	}

	const xml = await response.text();

	const parsed = await parseStringPromise(xml);
	const list: TExchangeRateValuteItem[] = parsed.ValCurs.Valute;
	const usd = list.find((v) => v.CharCode[0] === "USD");

	if (!usd) {
		throw new Error("Ошибка при поиске курса usd");
	}

	return usd.Value[0];
};
