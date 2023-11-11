import { Ticket } from "@src/domain/ticket";
import { adapterTicket } from "@src/adapter/ticket";
import { db } from "./config";

export const dbTicket = {
  getAllTickets,
}

async function getAllTickets(): Promise<Ticket[]> {
  const dbTickets = await db.ticket.findMany({
    include: {
      guest: true,
    }
  });

  return dbTickets.map((dbTicket) => adapterTicket.dbToDomain(dbTicket));
}
