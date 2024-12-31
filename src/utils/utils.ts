export const classList = (...classes: unknown[]) =>
	classes.filter(Boolean).join(" ");
