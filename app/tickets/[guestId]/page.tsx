import { dbGuest } from "@src/db/guest";

interface TicketsScreenProps {
  params: {
    guestId: string;
  };
}
export default function TicketsScreen({ params }: TicketsScreenProps) {
  const guest = dbGuest.getGuestById(params.guestId);


  return (
    <div>
      <h1>Tickets</h1>
      <p>Em breve...</p>
    </div>
  );
}