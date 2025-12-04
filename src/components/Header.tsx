import {
  Avatar,
  Button,
  Divider,
  Flex,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { AuthStatus } from "../types";

type HeaderProps = {
  auth: AuthStatus;
};

export default function Header({ auth }: HeaderProps) {
  const [, setUserMenuOpened] = useState(false);

  return (
    <>
      <Flex w="100%" justify="center">
        <Flex
          justify="space-between"
          p="10px"
          maw={800}
          align="center"
          w="100%"
        >
          <Link
            to="/"
            style={{ fontSize: "30px", color: "white", textDecoration: "none" }}
          >
            Auctions
          </Link>

          <Group>
            {auth.isAuthenticated ? (
              <Group>
                <Button component={Link} to="/create">
                  <AddIcon />
                  Create new auction
                </Button>
                <Menu
                  width={280}
                  position="bottom-end"
                  transitionProps={{ transition: "pop-top-right" }}
                  onClose={() => setUserMenuOpened(false)}
                  onOpen={() => setUserMenuOpened(true)}
                  withinPortal
                >
                  <Menu.Target>
                    <UnstyledButton>
                      <Group gap={7}>
                        <Avatar radius="xl" size={20} />
                        <Text>{auth.username}</Text>
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item component={Link} to={`/user/${auth.userId}`}>
                      Profile Page
                    </Menu.Item>

                    <Menu.Label>Auctions</Menu.Label>
                    <Menu.Item component={Link} to={"/followed/"}>
                      Followed user's auctions
                    </Menu.Item>

                    <Menu.Label>Reviews</Menu.Label>
                    <Menu.Item>My reviews</Menu.Item>
                    <Menu.Item>Given reviews</Menu.Item>

                    <Menu.Label>Settings</Menu.Label>
                    <Menu.Item>Account settings</Menu.Item>
                    <Menu.Item c="red" component={Link} to="/logout">
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
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
        </Flex>
      </Flex>

      <Divider />
    </>
  );
}
