import { Indicator } from "entity/indicator";
import { EIndicatorType } from "shared/types";
import { useModel } from "./useModel";

export const MoexIndex = () => {
	const { title, value, isLoading } = useModel();

	return (
		<Indicator
			title={title}
			value={value}
			isLoading={isLoading}
			type={EIndicatorType.NUMBER}
		/>
	);
};
