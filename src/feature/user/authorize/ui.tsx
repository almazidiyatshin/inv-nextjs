"use client";

import { Button } from "@chakra-ui/react";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { useModel } from "./useModel";

export const Authorization = () => {
	const { title, isAuthenticated, handleBtnClick } = useModel();

	return (
		<Button
			colorPalette={"teal"}
			size={"sm"}
			title={title}
			onClick={handleBtnClick}
		>
			{isAuthenticated ? <LuLogOut /> : <LuLogIn />}
			{title}
		</Button>
	);
};
