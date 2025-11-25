import { Button, Divider, Group } from "@mantine/core";
import { Link } from "react-router-dom";

type HeaderProps = {
  auth: boolean;
};

export default function Header({ auth }: HeaderProps) {
  return (
    <>
      <Group justify="space-between" p="10px">
        <Link
          to="/"
          style={{ fontSize: "30px", color: "white", textDecoration: "none" }}
        >
          Auctions
        </Link>

        <Group>
          {auth ? (
            <>
              <Button component={Link} to="/create">
                Create new auction
              </Button>
              <Button variant="default" component={Link} to="/logout">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="default" component={Link} to="/login">
                Log in
              </Button>
              <Button component={Link} to="/register">
                Sign up
              </Button>
            </>
          )}
        </Group>
      </Group>
      <Divider />
    </>
  );
}
