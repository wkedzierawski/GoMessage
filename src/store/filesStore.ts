import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Skeleton = {
	name: string;
	progress: number;
};

type FilesState = {
	files: File[];
	skeletons: Skeleton[];
	addFile: (file: File) => void;
	removeFile: (file: File) => void;
	clearFiles: () => void;
	addSkeleton: (payload: Skeleton) => void;
	removeSkeleton: (name: string) => void;
	updateSkeleton: (payload: Skeleton) => void;
};

export const useFilesStore = create<FilesState>()(
	immer((set) => ({
		files: [],
		skeletons: [],
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
		addSkeleton: (payload: Skeleton) =>
			set((state) => {
				state.skeletons.push(payload);
			}),
		removeSkeleton: (name: string) =>
			set((state) => {
				state.skeletons = state.skeletons.filter((item) => item.name !== name);
			}),
		updateSkeleton: (payload: Skeleton) =>
			set((state) => {
				const index = state.skeletons.findIndex(
					(item) => item.name === payload.name
				);
				state.skeletons[index] = payload;
			}),
	}))
);
