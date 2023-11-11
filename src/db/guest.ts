import { database } from "./config";
import { Guest } from "@domain/guest";
import { Uuid } from "common-schema";
import { adapterGuest } from "@src/adapter/guest";
import { dbTicket } from "./ticket";

export const dbGuest = {
  getAllGuests,
  getGuestById,
}

function getAllGuests(): Guest[] {
  const dbGuests = database().guests as any[];
  const tickets = dbTicket.getAllTickets();
  const guests = dbGuests.map((dbGuest) => {
    dbGuest.tickets = dbGuest.tickets.map((guestTickets) => tickets.find((ticket) => ticket.id === guestTickets.id))
    return adapterGuest.dbToDomain(dbGuest);
  });
  return guests;
}

function getGuestById(id: Uuid): Guest {
  const dbGuests = getAllGuests();
  const guest = dbGuests.find((dbGuest) => Guest.parse(dbGuest).id === id);
  return guest;
}