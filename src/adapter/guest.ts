import { Guest } from "@src/domain/guest";
import { DbGuest } from "@src/wire/db/guest";

export const adapterGuest = {
  dbToDomain,
};

function dbToDomain(guest: DbGuest): Guest {
  return Guest.parse(guest);
}