export const colors = ['blue', 'red', 'yellow', 'green', 'purple', 'pink'] as const;

export type Color = (typeof colors)[number];
