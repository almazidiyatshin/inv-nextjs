"use client";

import { useCallback, useState } from "react";

export const useAddAssetsDataButtonModel = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const handleModalOpen = useCallback(() => {
		setModalOpen(true);
	}, []);

	const handleModalClose = useCallback(() => {
		setModalOpen(false);
	}, []);

	return { isModalOpen, handleModalOpen, handleModalClose };
};
