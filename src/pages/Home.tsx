import { Flex } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function Home() {
  const [auth] = useState(isAuthenticated());
  return (
    <>
      <Flex justify="center" mt="sm" direction="column" align="center" gap="sm">
        {auth && <h3>Logged in</h3>}
        <Link to="/">home screen</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/login">Login</Link>
        <Link to="/create">Create new auction</Link>
      </Flex>
    </>
  );
}
