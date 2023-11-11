import { Button } from "@components";
import { dbGuest } from "@db/guest";

export default function Page() {
  const guests = dbGuest.getAllGuests();

  return (
    <div>
      <h1>Admin</h1>
      <ol>
        {guests.map((guest) => {
          return (
            <li>
              <Button href={`/tickets/${guest.id}`}>
                <span style={{ fontFamily: "monospace" }}>
                #{guest.id.slice(0, 5)}
                </span> | {guest.name}
              </Button>
            </li>
          );
        })}
      </ol>
      <ul>
        <li>
          <Button href="/">
            Voltar para a Home
          </Button>
        </li>
      </ul>
    </div>
  )
}
