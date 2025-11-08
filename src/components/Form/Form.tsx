import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  Loader,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/constants";
import api from "../../utils/api";
import displayError from "../../utils/displayError";

/**
 * Returns form for logging or registering the user.
 */

type formProps = {
  route: string;
  method: string;
};

export default function Form({ route, method }: formProps) {
  const name = method === "login" ? "Login" : "Register";
  const navigate = useNavigate();

  const schema = z.object({
    username: z.string().min(1, "Username is required").trim().toLowerCase(),
    password: z.string().min(1, "Password is required").trim(),
  });

  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const username = data.username;
    const password = data.password;

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      setError("root", { message: displayError(err) });
    }
  };

  return (
    <>
      <Stack mb="lg" m="xl" pl="xl" pr="xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register("username")}
            error={errors.username && errors.username.message}
            size="xl"
            label="Username"
            placeholder="Your username"
          />
          <PasswordInput
            {...register("password")}
            error={errors.password && errors.password.message}
            size="xl"
            mt="md"
            label="Password"
            placeholder="Your password"
          />

          {errors.root && (
            <Text size="lg" mt="md" c="red.8">
              {errors.root.message}
            </Text>
          )}

          <Flex justify="center" mt="md">
            {isSubmitting ? (
              <Loader type="bars" mt="md" />
            ) : (
              <Button type="submit" size="sm" mt="md" fullWidth>
                {name}
              </Button>
            )}
          </Flex>
        </form>
      </Stack>
      <Flex justify="center">
        <Link to={`/${name === "Login" ? "register" : "login"}`}>
          {name === "Login" ? "Register" : "Login"} here
        </Link>
      </Flex>
    </>
  );
}
