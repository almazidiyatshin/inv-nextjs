import { Indicator } from "entity";
import { EIndicatorType } from "shared/types";
import { useModel } from "./useModel";

export const AllAssetsValue = () => {
	const { title, value, isLoading } = useModel();

	return (
		<Indicator
			title={title}
			value={value}
			isLoading={isLoading}
			type={EIndicatorType.CURRENCY}
		/>
	);
};
