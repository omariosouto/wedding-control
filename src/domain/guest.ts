import { s } from "common-schema";

const guest_skeleton = {
  id: s.string(),
  name: s.string(),
  email: s.string(),
  tickets: s.number(),
  confirmed: s.boolean(),
};

export const Guest = s.object(guest_skeleton).required();

export type Guest = s.infer<typeof Guest>;