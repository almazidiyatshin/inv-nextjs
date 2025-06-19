'use client';

import { useForm } from 'react-hook-form';

export const useAssetsDataFormModel = () => {
	const { register, handleSubmit: handleSubmitForm } = useForm();

	const handleSubmit = handleSubmitForm((data) => {
		console.log({ data });
	});

	return { register, handleSubmit };
};
