import { Guest } from "@src/domain/guest";

export const logicGuest = {
  totalGivenTicketsByGuests,
  totalGuestsByCouple,
  getGroups,
};


function totalGivenTicketsByGuests(guests: Guest[]): number {
  const givenTickets = guests
    .filter((guests) => !guests.underAge)
    .reduce((acc, guest) => acc + guest.tickets.length, 0);
  return givenTickets;
}

function totalGuestsByCouple(guests: Guest[]) {
  const invitedByMario = guests.filter((guest) => {
    if (guest.underAge) return false;
    return guest.inviter.name.includes("Mario Souto");
  }).length;
  const invitedByAmanda = guests.filter((guest) => {
    if (guest.underAge) return false;
    return guest.inviter.name.includes("Amanda Almeida");
  }).length;

  return {
    husband: invitedByMario,
    wife: invitedByAmanda,
  };
}

function getGroups(guests: Guest[]) {
  const groupsMap = new Map();

  guests.forEach((guest) => {
    if (!guest.group) return;
    if (!groupsMap.has(guest.group.id)) groupsMap.set(guest.group.id, []);
    groupsMap.get(guest.group.id).push(guest);
  });

  const groups = Array.from(groupsMap.values());

  return groups;
}