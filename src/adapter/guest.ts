import { Guest } from "@src/domain/guest";

function dbToDomain(guest: unknown) {
  return Guest.parse(guest);
}

export const adapterGuest = {
  dbToDomain,
};