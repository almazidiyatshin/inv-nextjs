import { EAssetIds } from 'shared/constants';

export type TAssetCardProps = {
	id: EAssetIds;
	title: string;
	value: number;
	counts: {
		[x: string]: number;
	}[];
	isExpanded?: boolean;
	onToggle?: () => void;
};
