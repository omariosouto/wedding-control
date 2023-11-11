import { dbGuest } from "@src/db/guest";
import { Button } from "@src/components";
import { QRCode } from "./components/QRCode";
import { Ticket } from "@src/domain/ticket";

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
      <p>Você tem direito a {guest.tickets.length} convite{guest.tickets.length > 1 && "s"}</p>
      {guest.confirmed && (
        <>
          <h2>Presença confirmada: {guest.confirmed ? "✅" : "❌"}</h2>
          <TicketList tickets={guest.tickets} />
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

interface TicketListProps {
  tickets: Ticket[];
}
function TicketList({ tickets }: TicketListProps) {
  return (
    <ul
      className="m-auto flex max-w-screen-md"
    >
      {tickets.map((ticket) => (
        // tailwind scroll snap carousel item
        <li
          className="flex-1 flex flex-col relative bg-gray-100 px-4 pb-4"
          style={{
            maxWidth: "300px",
            width: "300px",
            height: "auto",
          }}
        >
          <span className="text-center m-4">
            🎫
          </span>
          <QRCode value={ticket.id} />
          <span className="text-center mt-2">
            {ticket.used ? "Usado ❌" : "Disponível ✅"}
          </span>
        </li>
      ))}
    </ul>
  )
}