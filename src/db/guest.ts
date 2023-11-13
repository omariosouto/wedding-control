import { db } from "./config";
import { Guest } from "@domain/guest";
import { Uuid } from "common-schema";
import { adapterGuest } from "@src/adapter/guest";

export const dbGuest = {
  getAllGuests,
  getGuestById,
  setAsConfirmed,
  cancelConfirmation,
}

async function getAllGuests(): Promise<Guest[]> {
  const dbGuests = await db.guest.findMany({
    include: {
      tickets: true,
      inviter: true,
      group: {
        include: {
          members: true,
        }
      }
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
      group: {
        include: {
          members: {
            include: {
              tickets: true,
            }
          },
        }
      }
    },
  });
  return Guest.parse(dbGuest);
}

async function setAsConfirmed(id: Uuid): Promise<void> {
  await db.guest.update({
    where: { id },
    data: {
      confirmed: true,
    }
  });
}

async function cancelConfirmation(id: Uuid): Promise<void> {
  await db.guest.update({
    where: { id },
    data: {
      confirmed: false,
    }
  });
}