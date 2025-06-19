import { EFormTypes } from "../types/types";
import { AddAssetsDataForm } from "../ui";

const titles = {
	[EFormTypes.VTB]: "VTB assets",
	[EFormTypes.SBER]: "SBER assets",
	[EFormTypes.CASH]: "Cash assets",
};

export const tabs = [
	{
		id: "1",
		title: titles[EFormTypes.VTB],
		Content: () => (
			<>
				<AddAssetsDataForm type={EFormTypes.VTB} />
			</>
		),
	},
	{
		id: "2",
		title: titles[EFormTypes.SBER],
		Content: () => (
			<>
				<AddAssetsDataForm type={EFormTypes.SBER} />
			</>
		),
	},
	{
		id: "3",
		title: titles[EFormTypes.CASH],
		Content: () => (
			<>
				<AddAssetsDataForm type={EFormTypes.CASH} />
			</>
		),
	},
];

export const fields = {
	[EFormTypes.VTB]: {
		inputs: [
			{ id: "1", name: "shares", placeholder: "Shares" },
			{ id: "2", name: "bonds", placeholder: "Bonds" },
			{ id: "3", name: "gold", placeholder: "Gold" },
		],
	},
	[EFormTypes.SBER]: {
		inputs: [
			{ id: "1", name: "shares", placeholder: "Shares" },
			{ id: "2", name: "bonds1", placeholder: "Bonds 1" },
			{ id: "3", name: "bonds2", placeholder: "Bonds 2" },
			{ id: "4", name: "bonds3", placeholder: "Bonds 3" },
			{ id: "5", name: "gold", placeholder: "Gold" },
		],
	},
	[EFormTypes.CASH]: {
		inputs: [
			{ id: "1", name: "dollars", placeholder: "Dollars" },
			{ id: "2", name: "rubbles", placeholder: "Rubbles" },
		],
	},
};
