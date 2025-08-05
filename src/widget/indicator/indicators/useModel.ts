import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export const useModel = () => {
	const isMobile = useBreakpointValue({ base: true, md: false });
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isLeftGradientVisible, setIsLeftGradientVisible] = useState(false);
	const [isRightGradientVisible, setIsRightGradientVisible] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <isMobile needed>
	useEffect(() => {
		const handleScroll = () => {
			if (!scrollRef.current) return;

			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

			setIsLeftGradientVisible(scrollLeft > 10);

			setIsRightGradientVisible(scrollLeft < scrollWidth - clientWidth - 10);
		};

		const scrollElement = scrollRef.current;

		if (scrollElement) {
			handleScroll();

			scrollElement.addEventListener("scroll", handleScroll);

			const resizeObserver = new ResizeObserver(handleScroll);
			resizeObserver.observe(scrollElement);

			return () => {
				scrollElement.removeEventListener("scroll", handleScroll);
				resizeObserver.disconnect();
			};
		}
	}, [isMobile]);

	return { isMobile, scrollRef, isLeftGradientVisible, isRightGradientVisible };
};
