import { Ticket } from '@domain/ticket';
import { DbTicket } from "@src/wire/db/ticket";

export const adapterTicket = {
  dbToDomain,
}

function dbToDomain(dbTicket: DbTicket): Ticket {
  return Ticket.parse(dbTicket);
}