import type { IMoexResponse } from "shared/api/t-invest-api/types";

export const getMoexIndex = async () => {
	const response = await fetch(
		"https://iss.moex.com/iss/engines/stock/markets/index/securities/IMOEX.json",
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			cache: "no-store",
		},
	);

	if (!response.ok) {
		throw new Error("Ошибка при получении MOEX index");
	}

	const data: IMoexResponse = await response.json();

	return data.marketdata.data[0].at(4);
};
