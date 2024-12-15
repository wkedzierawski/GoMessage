import { ReactNode } from "react";

type Props = {
	condition: unknown;
	children: ReactNode;
};
export const If = ({ condition, children }: Props) =>
	condition ? children : null;
