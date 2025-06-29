"use client";

import { useForm } from "react-hook-form";
// import { useCommonApi } from "shared/api";

export const useAssetsDataFormModel = () => {
	// const [request, { isLoading }] = useCommonApi.postCreateAssetRecord();
	const { register, handleSubmit: handleSubmitForm } = useForm();

	const handleSubmit = handleSubmitForm((data) => {
		const body = {
			eqmx: Number(data.eqmx),
			oblg: Number(data.oblg),
			gold: Number(data.gold),
		};
		// request({ assetId: "vtb", body });
		console.log({ body });
	});

	return { register, handleSubmit };
};
