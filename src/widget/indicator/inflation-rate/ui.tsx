import { Card } from "@chakra-ui/react";
import { Indicator } from "entity/indicator";
import { useModel } from "./useModel";

export const InflationRate = () => {
	const { title, value, isLoading } = useModel();

	return (
		<Card.Root minWidth={"190px"} flex={"1"}>
			<Card.Body>
				<Indicator title={title} value={value} isLoading={isLoading} />
			</Card.Body>
		</Card.Root>
	);
};
