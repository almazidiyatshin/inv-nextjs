import { Card, HStack } from "@chakra-ui/react";
import { Indicator } from "entity";
import { AllValuesIndicatorFilter } from "feature";
import { useModel } from "./useModel";

export const AllAssetsValue = () => {
	const { title, value, isLoading } = useModel();

	return (
		<Card.Root minWidth={"190px"} flex={"1"}>
			<Card.Body>
				<HStack align={"start"}>
					<Indicator title={title} value={value} isLoading={isLoading} />
					<AllValuesIndicatorFilter />
				</HStack>
			</Card.Body>
		</Card.Root>
	);
};
