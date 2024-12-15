import { useEffect, useRef } from "react";

export const useChangeEffect: typeof useEffect = (effect, deps) => {
	const first = useRef(true);

	useEffect(() => {
		if (first.current) {
			first.current = false;
			return;
		}

		return effect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};
