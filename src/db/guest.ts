import { db } from "./config";
import { Guest } from "@domain/guest";
import { Uuid } from "common-schema";
import { adapterGuest } from "@src/adapter/guest";

export const dbGuest = {
  getAllGuests,
  getGuestById,
}

async function getAllGuests(): Promise<Guest[]> {
  const dbGuests = await db.guest.findMany({
    include: {
      tickets: true,
      inviter: true,
    },
    where: {
      NOT: {
        role: "ADMIN",
      }
    }
  });
  const guests = dbGuests.map((dbGuest) => adapterGuest.dbToDomain(dbGuest));
  return guests;
}

async function getGuestById(id: Uuid): Promise<Guest> {
  const dbGuest = await db.guest.findUnique({
    where: { id },
    include: {
      tickets: true,
    },
  });
  return Guest.parse(dbGuest);
}