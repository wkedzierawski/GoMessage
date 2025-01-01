import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type FilesState = {
	files: File[];
	skeletons: number;
	addFile: (file: File) => void;
	removeFile: (file: File) => void;
	clearFiles: () => void;
	addSkeleton: () => void;
	removeSkeleton: (value?: number) => void;
};

export const useFilesStore = create<FilesState>()(
	immer((set) => ({
		files: [],
		skeletons: 0,
		addFile: (file: File) =>
			set((state) => {
				state.files = [...state.files, file];
			}),
		removeFile: (file: File) =>
			set((state) => {
				state.files = state.files.filter((item) => item !== file);
			}),
		clearFiles: () =>
			set((state) => {
				state.files = [];
			}),
		addSkeleton: () =>
			set((state) => {
				state.skeletons += 1;
			}),
		removeSkeleton: (value = 1) =>
			set((state) => {
				state.skeletons = Math.max(0, state.skeletons - value);
			}),
	}))
);
