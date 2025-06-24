"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();
	const { status } = useSession();

	const isAuthenticated = status === "authenticated";
	const title = t(isAuthenticated ? "logout" : "login");

	const handleBtnClick = () => (isAuthenticated ? signOut() : signIn("github"));

	return {
		title,
		isAuthenticated,
		handleBtnClick,
	};
};
