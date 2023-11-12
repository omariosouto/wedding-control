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
  email: s.string().optional().nullable(),
  phone: s.string().optional().nullable(),
  underAge: s.boolean(),
  tickets: s.array(GuestTicket),
  confirmed: s.boolean(),
  inviter: s.object({
    name: s.string(),
  }).optional().nullable(),
  group: s.object({
    id: s.string(),
    members: s.array(s.object({
      id: s.string(),
      name: s.string(),
      underAge: s.boolean(),
      tickets: s.array(GuestTicket).optional().nullable(),
    })),
  }).optional().nullable(),
};

export const Guest = s.object(guestSkeleton).required();
export type Guest = s.infer<typeof Guest>;