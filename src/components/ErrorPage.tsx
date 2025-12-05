import { Button, Flex, Text, Title } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";

type ErrorPageProps = {
  error: Error;
  resetErrorBoundary: (...args: any[]) => void;
};

export default function ErrorPage({
  error,
  resetErrorBoundary,
}: ErrorPageProps) {
  const queryClient = useQueryClient();

  const handleReset = () => {
    queryClient.resetQueries();
    resetErrorBoundary();
  };

  console.log(error);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      p="lg"
      style={{ minHeight: "80vh" }}
    >
      <Title c="red">Error</Title>
      <Text c="dimmed" mt="md" style={{ textAlign: "center" }} size="xl">
        {error.message}
      </Text>
      <Button onClick={handleReset} c="red" variant="default" mt="xl">
        Try Reloading Page
      </Button>
    </Flex>
  );
}
