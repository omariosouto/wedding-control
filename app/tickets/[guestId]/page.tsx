import { dbGuest } from "@src/db/guest";
import { Box, Button } from "@src/components";
import { QRCode } from "./components/QRCode";
import { cn } from "@src/infra/str/cn/cn";

interface TicketsScreenProps {
  params: {
    guestId: string;
  };
}
export default async function TicketsScreen({ params }: TicketsScreenProps) {
  const guest = await dbGuest.getGuestById(params.guestId);

  return (
    <div>
      <h1>Convites de: {guest.name}</h1>
      <p>Você tem direito a {guest.tickets.length} convite {guest.tickets.length > 1 && "s"} e a companhia de {guest.group.members.reduce((_groupMembers, member) => {
        if (member.name === guest.name) return _groupMembers;
        return [
          ..._groupMembers,
          member.name,
        ]
      }, []).join(", ")}</p>
      {guest.confirmed && (
        <>
          <h2>Presença confirmada: {guest.confirmed ? "✅" : "❌"}</h2>
          <TicketList tickets={guest.tickets} groupMembers={guest.group.members} />
          <ul>
            <li>
              <Button href="/gifts">
                Adicionar no Calendário
              </Button>
            </li>
            <li>
              <Button href="/gifts">
                Ver a Lista de presentes
              </Button>
            </li>
          </ul>
        </>
      )}
      {!guest.confirmed && (
        <ul>
          <li>
            <Button href="/gifts">
              Clique aqui e confirme sua presença
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
}

interface Ticket {
  id?: string;
  used?: boolean;
  name?: string;
  underAge?: boolean;
}
interface TicketListProps {
  tickets: Ticket[];
  groupMembers: any[];
}
function TicketList({ groupMembers, tickets }: TicketListProps) {
  if (groupMembers) {
    const groupTickets: Ticket[] = groupMembers.reduce((_groupTickets, member) => {
      return [
        ..._groupTickets,
        {
          id: member.id,
          name: member.name,
          underAge: member?.underAge,
          used: member?.tickets[0]?.used,
        }
      ];
    }, []);
    return (
      <ul
        className="m-auto flex max-w-screen-md"
      >
        {groupTickets.map((ticket) => (
          // tailwind scroll snap carousel item
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </ul>
    )
  }

  return (
    <ul
      className="m-auto flex max-w-screen-md"
    >
      {tickets.map((ticket) => (
        // tailwind scroll snap carousel item
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </ul>
  )
}

interface TicketItemProps {
  ticket: Ticket;
}
function TicketItem({ ticket }: TicketItemProps) {
  return (
    <li
      key={ticket.id}
      className="flex-1 flex flex-col relative bg-gray-100 px-4 pb-4"
      style={{
        maxWidth: "300px",
        width: "300px",
        height: "auto",
      }}
    >
      <span className="text-center m-4">
        🎫 {ticket.name && `- ${ticket.name}`}
      </span>
      <div className="relative">
        <div className="bg-white">
          <div className={cn({
            "opacity-0": ticket.underAge,
          })}>
            <QRCode value={ticket.id} />
          </div>
        </div>
        <span
          className="flex absolute inset-0 m-auto text-4xl items-center justify-center"
        >
          {ticket.underAge && (
            "👶"
          )}
        </span>
      </div>
      <span className="text-center mt-2">
        {ticket.used ? "Usado ❌" : "Disponível ✅"}
      </span>
    </li>
  )
}