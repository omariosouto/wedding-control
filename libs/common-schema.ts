import { z } from "zod";


export const Uuid = z.string().uuid();
export type Uuid = z.infer<typeof Uuid>;

export { z as s } from "zod";
