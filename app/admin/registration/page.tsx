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
    if(guest.underAge) return false;
    return guest.inviter.name.includes("Mario Souto");
  }).length;
  const invitedByAmanda = guests.filter((guest) => {
    if(guest.underAge) return false;
    return guest.inviter.name.includes("Amanda Almeida");
  }).length;

  return (
    <div>
      <h1>Tickets</h1>
      <p>You have <strong>{tickets.length}</strong> and have given <strong>{givenTickets}</strong> of them to guests</p>
      <p>Mario has invited: {invitedByMario}</p>
      <p>Amanda has invited: {invitedByAmanda}</p>
      <hr />
      <h1>Registration</h1>
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
          </tr>
        </thead>
        <tbody>
          {guests.map(user => (
            <tr key={user.id}>
              <td>{maskId(user.id)}</td>
              <td>{user.name} {user.underAge && `(👶)`}</td>
              <td>
                {user.underAge && (
                  "N/A"
                )}
                {!user.underAge && (
                  <Button href={`/tickets/${user.id}`}>
                    {user.tickets.length}
                  </Button>
                )}
              </td>
              <td>
                {user.inviter.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}