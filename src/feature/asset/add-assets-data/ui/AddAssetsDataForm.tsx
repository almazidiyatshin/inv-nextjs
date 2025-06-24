"use client";

// import { fields } from '../config/config';
import { Button } from "@chakra-ui/react";
import { useAssetsDataFormModel } from "../model/useAssetsDataFormModel";
// import type { TAddAssetsDataFormProps } from "../types/types";

// export const AddAssetsDataForm = ({type}: TAddAssetsDataFormProps) => {
export const AddAssetsDataForm = () => {
	const { handleSubmit } = useAssetsDataFormModel();

	return (
		<form onSubmit={handleSubmit}>
			{/* {fields[type].inputs.map(({ id, name, placeholder }) => (
				<Input
					key={id}
					placeholder={placeholder}
					register={() => register(name)}
				/>
			))} */}
			<Button type="submit">Submit</Button>
		</form>
	);
};
