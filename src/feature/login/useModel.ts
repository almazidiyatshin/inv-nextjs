"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslation } from "shared/lib";

export const useModel = () => {
	const t = useTranslation();
	const { status, data } = useSession();
	const isAuthenticated = status === "authenticated";
	const isAdmin = data?.user?.role === "admin";

	const btnTitle = t(isAuthenticated ? "logout" : "login");
	const userName = data?.user?.name;
	const userImage = data?.user?.image;

	const handleBtnClick = () => (isAuthenticated ? signOut() : signIn("github"));

	return {
		t,
		isAuthenticated,
		isAdmin,
		btnTitle,
		userName,
		userImage,
		handleBtnClick,
	};
};
