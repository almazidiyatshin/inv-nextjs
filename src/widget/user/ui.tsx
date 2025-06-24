import { VStack } from "@chakra-ui/react";
import { User } from "entity";
import { Authorization } from "feature";
import { useModel } from "./useModel";

export const UserWidget = () => {
	const { userImage, userName, isAuthenticated, isAdmin } = useModel();

	return (
		<VStack
			justify={"space-between"}
			width={"100%"}
			padding={"8"}
			borderRadius={"12px"}
			background={"gray.subtle"}
			gap={"6"}
		>
			<User
				userImage={userImage}
				userName={userName}
				isAuthenticated={isAuthenticated}
				isAdmin={isAdmin}
			/>
			<Authorization />
		</VStack>
	);
};
