import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

type TIndicatorData = {
	value: string;
};

export async function GET() {
	try {
		const response = await fetch("https://cbr.ru", {
			cache: "no-store",
		});
		const html = await response.text();

		const $ = cheerio.load(html);

		const indicators: TIndicatorData[] = [];
		$("div.main-indicator_value").each((_i, element) => {
			const value = $(element).text().trim();
			indicators.push({ value });
		});

		const [, inflationRate, keyRate] = indicators;
		return NextResponse.json([inflationRate.value, keyRate.value]);
	} catch (error) {
		console.error("Error fetching or parsing data:", error);

		return NextResponse.json(
			{ message: "Error fetching or parsing data" },
			{ status: 500 },
		);
	}
}
