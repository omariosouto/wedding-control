import { Button } from "@src/components";
import { maskId } from "@infra/str";
import { dbGuest } from "@src/db/guest";
import { dbTicket } from "@src/db/ticket";
import { logicGuest } from "@src/logic/guest";



export default async function RegistrationScreen() {
  const tickets = await dbTicket.getAllTickets();
  const guests = await dbGuest.getAllGuests();

  const givenTickets = logicGuest.totalGivenTicketsByGuests(guests);
  const totalGuestsInvitedBy = logicGuest.totalGuestsByCouple(guests);
  const groups = logicGuest.getGroups(guests);


  return (
    <div>
      <h1>Tickets</h1>
      <p>You have <strong>{tickets.length}</strong> and have given <strong>{givenTickets}</strong> of them to guests</p>
      <p>Mario has invited: {totalGuestsInvitedBy.husband}</p>
      <p>Amanda has invited: {totalGuestsInvitedBy.wife}</p>
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
            <th>Contact</th>
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
                {guest.email}
                <br />
                {guest.phone}
              </td>
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
        {groups.map((group, index) => (
          <li>
            #{(index+1).toString().padStart(2)} - {group.map(guest => guest.name).join(", ")} [{guests.reduce((confirmed, guest) => {
              if (confirmed) return true;
              return guest.confirmed;
            }, false) ? "Confirmed" : "Not Confirmed"}]
          </li>
        ))}
      </ul>
    </div>
  );
}