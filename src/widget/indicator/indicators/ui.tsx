import { Flex } from "@chakra-ui/react";
import { AllAssetsValue } from "../all-assets-value";
import { InflationRate } from "../inflation-rate";
import { KeyRate } from "../key-rate";
import { MoexIndex } from "../moex-index";
import { UsdExchangeRate } from "../usd-exchange-rate";

export const Indicators = () => (
	<Flex wrap={"wrap"} gap={"4"}>
		<AllAssetsValue />
		<MoexIndex />
		<InflationRate />
		<KeyRate />
		<UsdExchangeRate />
	</Flex>
);
