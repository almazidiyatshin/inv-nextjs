export const getIndicatorsQueryFn = async (
	_userData: void,
	_api: void,
	_extraOptions: void,
	baseQuery: void
) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const result = await baseQuery({
		url: '/indicators',
		method: 'GET',
	});

	if (result?.error) {
		return {
			data: ['—', '—'],
		};
	}

	return {
		data: result.data,
	};
};

export const getMoexIndexQueryFn = async (
	_userData: void,
	_api: void,
	_extraOptions: void,
	baseQuery: void
) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const result = await baseQuery({
		url: '/moexIndex',
		method: 'GET',
	});

	if (result?.error) {
		return {
			data: [],
		};
	}

	return {
		data: result.data,
	};
};
