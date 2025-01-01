import { useRef } from "react";
import { Files } from "../utils/file";
import { useChangeEffect } from "./useChangeEffect";

export const useBlob = (file: File | ArrayBuffer) => {
	const { source, remove } = useRef(Files.makeSource(file)).current;

	useChangeEffect(() => {
		return remove;
	}, []);

	return source;
};
