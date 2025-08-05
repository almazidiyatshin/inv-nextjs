"use client";

import { Box } from "@chakra-ui/react";
import { Indicator } from "entity/indicator";
import { useModel } from "./useModel";

export const InflationRate = () => {
	const { title, value, isLoading } = useModel();

	return (
		<Box>
			<Indicator title={title} value={value} isLoading={isLoading} />
		</Box>
	);
};
