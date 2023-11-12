import {
  Button,
  Text,
  Box,
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@src/components";
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
    { name: 'Total Tickets', stat: tickets.length, change: `${givenTickets}/${tickets.length}`, limit: givenTickets < tickets.length ? 'avaiable' : 'soldout' },
    { name: 'Amanda', stat: totalGuestsInvitedBy.wife, change: `${totalGuestsInvitedBy.wife}/${tickets.length / 2}`, limit: totalGuestsInvitedBy.wife < tickets.length / 2 ? 'avaiable' : 'soldout' },
    { name: 'Mario', stat: totalGuestsInvitedBy.husband, change: `${totalGuestsInvitedBy.husband}/${tickets.length / 2}`, limit: totalGuestsInvitedBy.husband < tickets.length / 2 ? 'avaiable' : 'soldout' },
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
                    item.limit === 'avaiable' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                  )}
                >
                  <span className="sr-only"> {item.limit === 'avaiable' ? 'Avaiable' : 'Sold Out'} by </span>
                  {item.change}
                </div>
              </dd>
            </div>
          ))}
        </dl>

        <Button href="/admin/registration/new-guest" variant="default" size="sm">
          Add New Guest
        </Button>
      </Box>


      <Separator className="my-4" />

      <Tabs defaultValue="guests" className="flex flex-col items-center justify-center">
        <TabsList>
          <TabsTrigger value="guests">Guests</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>
        <TabsContent value="guests" className="w-full">
          <Text tag="h2" className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
            All Guests
          </Text>

          <Table>
            <TableCaption>A list of the wedding guests.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Tickets</TableHead>
                <TableHead>Invited By</TableHead>
                <TableHead>Confirmed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map(guest => (
                <TableRow key={guest.id}>
                  <TableCell>{maskId(guest.id)}</TableCell>
                  <TableCell>{guest.name} {guest.underAge && `(👶)`}</TableCell>
                  <TableCell>
                    {guest.email}
                    <br />
                    {guest.phone}
                  </TableCell>
                  <TableCell className="text-center">
                    {guest.underAge && (
                      "N/A"
                    )}
                    {!guest.underAge && (
                      <Button href={`/tickets/${guest.id}`} variant="ghost">
                        {guest.tickets.length}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {guest.inviter.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {guest.confirmed ? "✅" : "🚧"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="groups" className="w-full">
          <Text tag="h2" className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
            Groups
          </Text>
          <Table>
            <TableCaption>A list of the wedding guests groups.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Group Members</TableHead>
                <TableHead className="text-center">Confirmation Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group, index) => (
                <TableRow key={`group__${index}`}>
                  <TableCell>
                    {(index + 1).toString().padStart(2)}
                  </TableCell>
                  <TableCell>
                    {group.map(guest => guest.name).join(", ")}
                  </TableCell>
                  <TableCell className="text-center">
                    {guests.reduce((confirmed, guest) => {
                      if (confirmed) return true;
                      return guest.confirmed;
                    }, false) ? "✅" : "🚧"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </Box>
  );
}
