import { Indicator } from "entity/indicator";
import { useModel } from "./useModel";

export const KeyRate = () => {
	const { title, value, isLoading } = useModel();

	return <Indicator title={title} value={value} isLoading={isLoading} />;
};
