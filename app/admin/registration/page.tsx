import { Button } from "@src/components";
import { dbGuest } from "@src/db/guest";
import { dbTicket } from "@src/db/ticket";



export default async function RegistrationScreen() {
  const tickets = await dbTicket.getAllTickets();
  const guests = await dbGuest.getAllGuests();
  const givenTickets = guests
    .filter((guests) => !guests.underAge)
    .reduce((acc, guest) => acc + guest.tickets.length, 0);

  return (
    <div>
      <h1>Tickets</h1>
      <p>You have <strong>{tickets.length}</strong> and have given <strong>{givenTickets}</strong> of them to guests</p>
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
          </tr>
        </thead>
        <tbody>
          {guests.map(user => (
            <tr key={user.id}>
              <td>{user.id.slice(0, 6)}</td>
              <td>{user.name} {user.underAge && `(👶)`}</td>
              <td>
                <Button href={`/tickets/${user.id}`}>
                  {user.tickets.length}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}