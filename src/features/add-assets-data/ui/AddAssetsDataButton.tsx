"use client";

// import { useAddAssetsDataButtonModel } from '../model';
// import { tabs } from '../config/config';
import { Button } from "@chakra-ui/react";

export const AddAssetsDataButton = () => {
	// const { isModalOpen, handleModalOpen, handleModalClose } =
	// 	useAddAssetsDataButtonModel();

	return (
		<>
			<Button
				variant={"subtle"}
				size={"sm"}
				type="submit"
				colorPalette={"teal"}
				// onClick={handleModalOpen}
			>
				Add data
			</Button>

			{/* <Modal isOpen={isModalOpen} onClose={handleModalClose}>
				<Tabs tabs={tabs} />
			</Modal> */}
		</>
	);
};
