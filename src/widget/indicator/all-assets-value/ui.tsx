import { Card, Skeleton, Stat, Text, VStack } from "@chakra-ui/react";
import { AllValuesIndicatorFilter } from "feature";
import { useModel } from "./useModel";

export const AllAssetsValue = () => {
	const { value, isLoading } = useModel();

	return (
		<Card.Root variant={"subtle"} minWidth={"190px"}>
			<Card.Body>
				<Stat.Root size={"lg"}>
					<VStack align={"start"} gap={0}>
						<AllValuesIndicatorFilter />
						<Stat.ValueText width={"full"}>
							{isLoading ? (
								<Skeleton marginTop={"2"} height="7" width="20%" />
							) : (
								<Text fontSize={"4xl"}>{value}</Text>
							)}
						</Stat.ValueText>
					</VStack>
				</Stat.Root>
			</Card.Body>
		</Card.Root>
	);
};
