"use client";

import { Avatar, Button, Flex, Group, Text } from "@chakra-ui/react";
import { useModel } from "./useModel";

export const Login = () => {
	const {
		t,
		userImage,
		userName,
		isAuthenticated,
		isAdmin,
		btnTitle,
		handleBtnClick,
	} = useModel();

	return (
		<Group justify={"space-between"} width={"100%"}>
			<Flex gap={2} align={"center"}>
				{userImage && userName && (
					<Avatar.Root size={"2xs"}>
						<Avatar.Fallback name={userName} />
						<Avatar.Image src={userImage} />
					</Avatar.Root>
				)}
				<Text fontWeight="medium">
					{isAuthenticated
						? isAdmin
							? userName
							: `${userName} (${t("demoMode")})`
						: t("demoMode")}
				</Text>
			</Flex>

			<Button size={"xs"} title={btnTitle} onClick={handleBtnClick}>
				{btnTitle}
			</Button>
		</Group>
	);
};
