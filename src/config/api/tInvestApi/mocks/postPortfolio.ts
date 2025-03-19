import { getRandomBigInteger, getRandomInteger } from '../utils/common';

const positionsData = [
	{
		figi: 'BBG004S681B4',
		instrumentType: 'share',
		positionUid: '9f4c35ea-c5da-4526-89a1-1e29509a750f',
		instrumentUid: '161eb0d0-aaac-4451-b374-f5d0eeb1b508',
	},
	{
		figi: 'TCS00A108BL2',
		instrumentType: 'etf',
		positionUid: '8da68570-7ebd-44c6-9afc-83abbd2c2eb7',
		instrumentUid: '3783c7a7-4c20-49a8-8e28-f54229b414c8',
	},
	{
		figi: 'TCS10A101X50',
		instrumentType: 'etf',
		positionUid: '548bde28-a5ea-4b7b-83d3-47b4c56a0167',
		instrumentUid: '4c466956-d2ce-4a95-abb4-17947a65f18a',
	},
	{
		figi: 'BBG004S68507',
		instrumentType: 'share',
		positionUid: '3e2d3ee8-e757-418b-8443-306b9a9988a3',
		instrumentUid: '7132b1c9-ee26-4464-b5b5-1046264b61d9',
	},
	{
		figi: 'TCS00A107597',
		instrumentType: 'etf',
		positionUid: 'e958867f-6592-42c5-8712-bb9476726e08',
		instrumentUid: '89cdfd81-5021-45f8-b3ac-96dffc2e70a2',
	},
	{
		figi: 'BBG333333333',
		instrumentType: 'etf',
		positionUid: '29888afc-181d-45ed-a00b-8fe55a9cec9b',
		instrumentUid: '9654c2dd-6993-427e-80fa-04e80a1cf4da',
	},
	{
		figi: 'BBG000TY1CD1',
		instrumentType: 'share',
		positionUid: '7e12ee80-9a45-4011-878f-593d810e9277',
		instrumentUid: '974077c4-d893-4058-9314-8f1b64a444b8',
	},
	{
		figi: 'TCS00A1039N1',
		instrumentType: 'etf',
		positionUid: 'c1a8e0b5-a4bb-4f4c-b109-68e0149b5b23',
		instrumentUid: 'a9ff2a1a-f8de-4648-8d5a-6b264f32fcdf',
	},
	{
		figi: 'BBG004RVFCY3',
		instrumentType: 'share',
		positionUid: '6980e298-3ef5-4a1d-9148-6aba5668aa69',
		instrumentUid: 'ca845f68-6c43-44bc-b584-330d2a1e5eb7',
	},
	{
		figi: 'BBG00475K6C3',
		instrumentType: 'share',
		positionUid: '50aac9d1-b53b-4d96-934e-941fe78e38aa',
		instrumentUid: 'fa6aae10-b8d5-48c8-bbfd-d320d925d096',
	},
	{
		figi: 'TCS00A10A1L8',
		instrumentType: 'etf',
		positionUid: '3d4bef30-458c-44d6-b7af-7922989e5092',
		instrumentUid: 'f2a4ebfb-40c7-43d3-bbfc-6a01855c4907',
	},
];

export const postPortfolioMockedResponse = {
	totalAmountShares: {
		currency: 'rub',
		units: getRandomInteger().toString(),
		nano: getRandomBigInteger(),
	},
	expectedYield: {
		units: getRandomInteger().toString(),
		nano: getRandomBigInteger(),
	},
	positions: positionsData.map(
		({ figi, instrumentType, positionUid, instrumentUid }) => ({
			figi,
			instrumentType,
			positionUid,
			instrumentUid,
			quantity: {
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			averagePositionPrice: {
				currency: 'rub',
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			expectedYield: {
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			averagePositionPricePt: {
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			currentPrice: {
				currency: 'rub',
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			averagePositionPriceFifo: {
				currency: 'rub',
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			quantityLots: {
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			blocked: false,
			blockedLots: {
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			varMargin: {
				currency: '',
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			expectedYieldFifo: {
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
			dailyYield: {
				currency: 'rub',
				units: getRandomInteger().toString(),
				nano: getRandomBigInteger(),
			},
		})
	),
};
