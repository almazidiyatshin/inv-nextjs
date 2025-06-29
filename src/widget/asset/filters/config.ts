import { AssetRangeFilter, AssetValueFilter } from "feature/asset";
import { EAssetId } from "shared/constants";

export const config = {
	[EAssetId.T_SHARES]: [
		{ disabled: false, Component: AssetRangeFilter },
		{ disabled: true, Component: AssetValueFilter },
	],
	[EAssetId.T_BONDS]: [
		{ disabled: false, Component: AssetRangeFilter },
		{ disabled: true, Component: AssetValueFilter },
	],
	[EAssetId.T_GOLD]: [
		{ disabled: false, Component: AssetRangeFilter },
		{ disabled: true, Component: AssetValueFilter },
	],
	[EAssetId.VTB_SHARES]: [
		{ disabled: false, Component: AssetRangeFilter },
		{ disabled: false, Component: AssetValueFilter },
	],
	[EAssetId.VTB_BONDS]: [
		{ disabled: false, Component: AssetRangeFilter },
		{ disabled: false, Component: AssetValueFilter },
	],
	[EAssetId.VTB_GOLD]: [
		{ disabled: false, Component: AssetRangeFilter },
		{ disabled: false, Component: AssetValueFilter },
	],
	[EAssetId.SBER_SHARES]: [
		{ disabled: false, Component: AssetRangeFilter },
		{ disabled: false, Component: AssetValueFilter },
	],
	[EAssetId.SBER_BONDS]: [
		{ disabled: false, Component: AssetRangeFilter },
		{ disabled: false, Component: AssetValueFilter },
	],
	[EAssetId.SBER_GOLD]: [
		{ disabled: false, Component: AssetRangeFilter },
		{ disabled: false, Component: AssetValueFilter },
	],
};
