import { Button } from "@src/components";
import { dbGuest } from "@src/db/guest";



export default async function RegistrationScreen() {
  const guests = await dbGuest.getAllGuests();

  return (
    <div>
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