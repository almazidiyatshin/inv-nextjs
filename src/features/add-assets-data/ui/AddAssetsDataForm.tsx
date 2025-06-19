'use client';

import { useAssetsDataFormModel } from '../model/useAssetsDataFormModel';
import { TAddAssetsDataFormProps } from '../types/types';
// import { fields } from '../config/config';
import { Button } from '@chakra-ui/react';

export const AddAssetsDataForm = ({}: TAddAssetsDataFormProps) => {
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
