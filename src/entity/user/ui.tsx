import { Avatar, Text, VStack } from "@chakra-ui/react";
import type { TUserProps } from "./types";
import { useModel } from "./useModel";

export const User = ({
	userName,
	userImage,
	isAuthenticated,
	isAdmin,
}: TUserProps) => {
	const { demoUserName, demoModeLabel } = useModel();

	return (
		<VStack gap={"4"}>
			<Avatar.Root size={"sm"}>
				<Avatar.Fallback name={userName} />
				<Avatar.Image src={userImage} />
			</Avatar.Root>
			<Text fontSize={"lg"} fontWeight="medium">
				{isAuthenticated
					? isAdmin
						? userName
						: `${userName} (${demoModeLabel})`
					: demoUserName}
			</Text>
		</VStack>
	);
};
