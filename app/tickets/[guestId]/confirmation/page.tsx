import { Box, Button, Text } from "@src/components";
import { dbGuest } from "@src/db/guest";
import { redirect } from 'next/navigation';


interface ConfirmationScreenProps {
  params: {
    guestId: string;
  };
}
export default function ConfirmationScreen({ params }: ConfirmationScreenProps) {
  const guestId = params.guestId;

  return (
    <Box className="p-4">
      <Text tag="h1" className="text-2xl">
        Para confirmar sua presença, precisamos de alguns dados:
      </Text>
      <form
        action={async () => {
          'use server'
          dbGuest.setAsConfirmed(guestId);
          redirect(`/tickets/${guestId}`);
        }}
      >
        <Box>
          <input placeholder="Email" />
        </Box>
        <Box>
          <input placeholder="Telefone" />
        </Box>

        <Box className="flex flex-row">
          <Button
            type="submit"
            variant="default"
            size="sm"
          >
            Confirmar presença
          </Button>

          <Button
            variant="ghost"
            size="sm"
            href={`/tickets/${guestId}/confirmation`}
          >
            Voltar para os ingressos
          </Button>
        </Box>
      </form>

      <Box tag="ul">
        <Text tag="li">

        </Text>
      </Box>
    </Box>
  );
}