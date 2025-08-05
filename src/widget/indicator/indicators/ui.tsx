"use client";

import { Box, Card, Flex, Separator } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { AllAssetsValue } from "../all-assets-value";
import { InflationRate } from "../inflation-rate";
import { KeyRate } from "../key-rate";
import { MoexIndex } from "../moex-index";
import { UsdExchangeRate } from "../usd-exchange-rate";
import { useModel } from "./useModel";

export const Indicators = () => {
	const { isMobile, scrollRef, isLeftGradientVisible, isRightGradientVisible } =
		useModel();

	if (isMobile) {
		return (
			<Card.Root>
				<Card.Body>
					<Box position="relative">
						<Box
							ref={scrollRef}
							overflowX="auto"
							css={{
								scrollSnapType: "x mandatory",
								scrollbarWidth: "none",
								msOverflowStyle: "none",
								"&::-webkit-scrollbar": {
									display: "none",
								},
							}}
						>
							<Flex gap="4" minW="max-content">
								<Box minW="120px" css={{ scrollSnapAlign: "start" }}>
									<AllAssetsValue />
								</Box>
								<Separator variant="solid" orientation="vertical" />
								<Box minW="120px" css={{ scrollSnapAlign: "start" }}>
									<MoexIndex />
								</Box>
								<Separator variant="solid" orientation="vertical" />
								<Box minW="120px" css={{ scrollSnapAlign: "start" }}>
									<InflationRate />
								</Box>
								<Separator variant="solid" orientation="vertical" />
								<Box minW="120px" css={{ scrollSnapAlign: "start" }}>
									<KeyRate />
								</Box>
								<Separator variant="solid" orientation="vertical" />
								<Box minW="120px" css={{ scrollSnapAlign: "start" }}>
									<UsdExchangeRate />
								</Box>
							</Flex>
						</Box>

						{isLeftGradientVisible && (
							<Box
								position="absolute"
								top="0"
								left="0"
								h="full"
								w="80px"
								pointerEvents="none"
								bg="linear-gradient(to right, var(--chakra-colors-bg-panel), transparent)"
								zIndex="1"
								transition="opacity 0.2s"
								alignContent={"center"}
								justifyItems={"start"}
							/>
						)}

						{isRightGradientVisible && (
							<Box
								position="absolute"
								top="0"
								right="0"
								h="full"
								w="80px"
								pointerEvents="none"
								bg="linear-gradient(to left, var(--chakra-colors-bg-panel), transparent)"
								zIndex="1"
								transition="opacity 0.2s"
								alignContent={"center"}
								justifyItems={"end"}
							/>
						)}
					</Box>
				</Card.Body>
			</Card.Root>
		);
	}

	return (
		<Card.Root>
			<Card.Body>
				<Flex gap="4" justify="space-between">
					<AllAssetsValue />
					<Separator variant="solid" orientation="vertical" />
					<MoexIndex />
					<Separator variant="solid" orientation="vertical" />
					<InflationRate />
					<Separator variant="solid" orientation="vertical" />
					<KeyRate />
					<Separator variant="solid" orientation="vertical" />
					<UsdExchangeRate />
				</Flex>
			</Card.Body>
		</Card.Root>
	);
};
