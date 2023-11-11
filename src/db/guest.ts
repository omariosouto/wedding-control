import { database } from "./config";
import { Guest } from "@domain/guest";
import { Uuid } from "common-schema";
import { adapterGuest } from "@src/adapter/guest";


function getAllGuests(): Guest[] {
  const dbGuests = database().guests as unknown[];
  const guests = dbGuests.map((dbGuest) => adapterGuest.dbToDomain(dbGuest));
  return guests;
}

function getGuestById(id: Uuid): Guest {
  const dbGuests = getAllGuests();
  const guest = dbGuests.find((dbGuest) => Guest.parse(dbGuest).id === id);
  console.log(guest);
  return guest;
}

export const dbGuest = {
  getAllGuests,
  getGuestById,
}