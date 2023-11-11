import { s } from "common-schema";

export const ticketSkeleton = {
  id: s.string(),
  used: s.boolean(),
};

export const Ticket = s.object(ticketSkeleton).required();
export type Ticket = s.infer<typeof Ticket>;