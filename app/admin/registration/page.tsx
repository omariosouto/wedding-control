import { Button, Text, Box } from "@src/components";
import { maskId } from "@infra/str";
import { dbGuest } from "@src/db/guest";
import { dbTicket } from "@src/db/ticket";
import { logicGuest } from "@src/logic/guest";
import { cn } from "@src/infra/str/cn/cn";



export default async function RegistrationScreen() {
  const tickets = await dbTicket.getAllTickets();
  const guests = await dbGuest.getAllGuests();

  const givenTickets = logicGuest.totalGivenTicketsByGuests(guests);
  const totalGuestsInvitedBy = logicGuest.totalGuestsByCouple(guests);
  const groups = logicGuest.getGroups(guests);

  const stats = [
    { name: 'Total Tickets', stat: tickets.length, change: `${givenTickets}/${tickets.length}`, changeType: 'increase' },
    { name: 'Mario', stat: totalGuestsInvitedBy.husband, change: `${totalGuestsInvitedBy.husband}/${tickets.length / 2}`, changeType: 'increase' },
    { name: 'Amanda', stat: totalGuestsInvitedBy.wife, change: `${totalGuestsInvitedBy.wife}/${tickets.length / 2}`, changeType: 'decrease' },
  ];

  return (
    <Box className="max-w-3xl mx-auto bg-white shadow rounded-md mt-12 p-6">
      <Box>
        <Text tag="h1" className="text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Marriage Management
        </Text>

        <dl className="my-4 grid grid-cols-1 divide-gray-200 overflow-hidden rounded-lg bg-white md:grid-cols-3 divide-y md:divide-x md:divide-y-0">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">{item.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold">
                  {item.stat}
                </div>

                <div
                  className={cn(
                    item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                  )}
                >
                  <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                  {item.change}
                </div>
              </dd>
            </div>
          ))}
        </dl>

        {/* <Box tag="ul">
          <Text tag="li"><strong>Mario</strong> has invited: {totalGuestsInvitedBy.husband}</Text>
          <Text tag="li"><strong>Amanda</strong> has invited: {totalGuestsInvitedBy.wife}</Text>
        </Box> */}
        <Button href="/admin/registration/new-guest" variant="default" size="sm">
          Add New Guest
        </Button>
      </Box>


      <hr className="my-4" />
      <Text tag="h2" className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
        All Guests
      </Text>
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
      <Text tag="h2" className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
        Groups
      </Text>
      <ul>
        {groups.map((group, index) => (
          <li>
            #{(index + 1).toString().padStart(2)} - {group.map(guest => guest.name).join(", ")} [{guests.reduce((confirmed, guest) => {
              if (confirmed) return true;
              return guest.confirmed;
            }, false) ? "Confirmed" : "Not Confirmed"}]
          </li>
        ))}
      </ul>
    </Box>
  );
}
