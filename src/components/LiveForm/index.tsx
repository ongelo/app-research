import { Box, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import LiveBlock from "./LiveBlock";

const LiveForm = () => {
  const [researchForm, _] = useLocalStorage<LiveBlock[]>({
    key: "researchForm",
  });
  const form = useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    console.log({ values });
  };

  if (!researchForm) {
    return null;
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="xl">
        {researchForm?.map((researchForm) => (
          <LiveBlock key={researchForm.id} form={form} block={researchForm} />
        ))}
      </Stack>

      <Box pos="fixed" bottom={0} right={0} left={0}>
        <Button type="submit" size="xl" mt="sm" radius="xs" fullWidth>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default LiveForm;
