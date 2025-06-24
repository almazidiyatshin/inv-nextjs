import { Indicator } from "entity";
import { EIndicatorType } from "shared/types";
import { useModel } from "./useModel";

export const AllAssetsValue = () => {
	const { title, value, isLoading } = useModel();

	return (
		<Indicator
			title={title}
			value={value?.toFixed(0)}
			isLoading={isLoading}
			type={EIndicatorType.CURRENCY}
		/>
	);
};
