import { useSession } from "next-auth/react";

export const useModel = () => {
	const { status, data } = useSession();

	const isAuthenticated = status === "authenticated";
	const isAdmin = data?.user?.role === "admin";
	const userName = data?.user?.name || undefined;
	const userImage = data?.user?.image || undefined;

	return {
		isAuthenticated,
		isAdmin,
		userName,
		userImage,
	};
};
