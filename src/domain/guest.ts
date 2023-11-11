import { s } from "common-schema";
import { ticketSkeleton } from "./ticket";

const guestTicketSkeleton = {
  id: ticketSkeleton.id,
  used: ticketSkeleton.used,
};

export const GuestTicket = s.object(guestTicketSkeleton).required();
export type GuestTicket = s.infer<typeof Guest>;

const guestSkeleton = {
  id: s.string(),
  name: s.string(),
  email: s.string(),
  tickets: s.array(GuestTicket),
  confirmed: s.boolean(),
};

export const Guest = s.object(guestSkeleton).required();
export type Guest = s.infer<typeof Guest>;