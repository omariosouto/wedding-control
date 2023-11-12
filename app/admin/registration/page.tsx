import { Button } from "@src/components";
import { maskId } from "@infra/str";
import { dbGuest } from "@src/db/guest";
import { dbTicket } from "@src/db/ticket";



export default async function RegistrationScreen() {
  const tickets = await dbTicket.getAllTickets();
  const guests = await dbGuest.getAllGuests();

  // TODO: Move to logics
  const givenTickets = guests
    .filter((guests) => !guests.underAge)
    .reduce((acc, guest) => acc + guest.tickets.length, 0);
  const invitedByMario = guests.filter((guest) => {
    if (guest.underAge) return false;
    return guest.inviter.name.includes("Mario Souto");
  }).length;
  const invitedByAmanda = guests.filter((guest) => {
    if (guest.underAge) return false;
    return guest.inviter.name.includes("Amanda Almeida");
  }).length;
  const groupsMap = new Map();
  guests.forEach((guest) => {
    if (!guest.group) return;
    if (!groupsMap.has(guest.group.id)) groupsMap.set(guest.group.id, []);
    groupsMap.get(guest.group.id).push(guest);
  });
  const groups = Array.from(groupsMap.values());


  return (
    <div>
      <h1>Tickets</h1>
      <p>You have <strong>{tickets.length}</strong> and have given <strong>{givenTickets}</strong> of them to guests</p>
      <p>Mario has invited: {invitedByMario}</p>
      <p>Amanda has invited: {invitedByAmanda}</p>
      <hr className="my-4" />
      <h1 className="text-2xl">Registration</h1>
      <form>
        <button>
          Add Guest
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Tickets</th>
            <th>Invited By</th>
            <th>Confirmed</th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(guest => (
            <tr key={guest.id}>
              <td>{maskId(guest.id)}</td>
              <td>{guest.name} {guest.underAge && `(👶)`}</td>
              <td>
                {guest.underAge && (
                  "N/A"
                )}
                {!guest.underAge && (
                  <Button href={`/tickets/${guest.id}`}>
                    {guest.tickets.length}
                  </Button>
                )}
              </td>
              <td>
                {guest.inviter.name}
              </td>
              <td>
                {guest.confirmed ? "Confirmed" : "Not Confirmed"}
              </td>
              <td>
                {Boolean(guest.group) ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-2xl">Groups</h2>
      <ul>
        {groups.map(group => (
          <li>
            #01 - {group.map(guest => guest.name).join(", ")} [{guests.reduce((confirmed, guest) => {
              if (confirmed) return true;
              return guest.confirmed;
            }, false) ? "Confirmed" : "Not Confirmed"}]
          </li>
        ))}
      </ul>
    </div>
  );
}