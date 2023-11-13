import { dbGuest } from "@src/db/guest";
import { Box, Button } from "@src/components";
import { TicketList } from "./components/Ticket";
import { redirect } from "next/navigation";

interface TicketsScreenProps {
  params: {
    guestId: string;
  };
}
export default async function TicketsScreen({ params }: TicketsScreenProps) {
  const guest = await dbGuest.getGuestById(params.guestId);
  const groupMemberNames = guest.group?.members.reduce((_groupMembers, member) => {
    if (member.name === guest.name) return _groupMembers;
    return [
      ..._groupMembers,
      member.name,
    ]
  }, []).join(", ");

  return (
    <Box className="p-4">
      <h1>Convites de: {guest.name}</h1>
      <p>Você tem direito a {guest.tickets.length} convite {guest.tickets.length > 1 && "s"} {groupMemberNames && `e a companhia de ${groupMemberNames}`}</p>
      {guest.confirmed && (
        <>
          <h2>Presença confirmada: {guest.confirmed ? "✅" : "❌"}</h2>
          <TicketList tickets={guest.tickets} groupMembers={guest.group?.members} />
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
            <li>
              <form>
                <Button
                  type="submit"
                  variant="destructive"
                  size="sm"
                  formAction={async () => {
                    "use server";
                    await dbGuest.cancelConfirmation(guest.id);
                    redirect(`/tickets/${guest.id}?canceled=true`);
                  }}
                >
                  Cancelar Confirmação
                </Button>
              </form>
            </li>
          </ul>
        </>
      )}
      {!guest.confirmed && (
        <ul>
          <li>
            <Button
              type="button"
              variant="default"
              size="sm"
              href={`/tickets/${guest.id}/confirmation`}
            >
              Clique aqui e confirme sua presença
            </Button>
          </li>
        </ul>
      )}
    </Box>
  );
}