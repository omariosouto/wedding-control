import { PrismaClient } from '@prisma/client';

async function prismaExample() {
  const prisma = new PrismaClient();
  return await prisma.guest.findMany({
    include: {
      tickets: true,
    },
  });
}

export default async function RegistrationScreen() {
  const users = await prismaExample();

  return (
    <div>
      <h1>Registration</h1>
      <form>
        <button>
          Add User
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Under age (7 years old)</th>
            <th>Tickets</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id.slice(0, 6)}</td>
              <td>{user.name}</td>
              <td>{user.underAge ? "✅" : "❌"}</td>
              <td>
                {user.tickets.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}