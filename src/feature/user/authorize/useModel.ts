"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export const useModel = () => {
	const t = useTranslations();
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
