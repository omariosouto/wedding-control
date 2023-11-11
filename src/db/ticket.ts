import { Ticket } from "@src/domain/ticket";
import { database } from "./config";
import { adapterTicket } from "@src/adapter/ticket";

export const dbTicket = {
  getAllTickets,
}

function getAllTickets(): Ticket[] {
  const dbTickets = database().tickets as unknown[];
  const tickets = dbTickets.map((dbTicket) => adapterTicket.dbToDomain(dbTicket));
  return tickets
}