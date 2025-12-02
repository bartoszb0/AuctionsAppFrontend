import { Button, Card, Flex, Group, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuctionsListing from "../components/AuctionsListing";
import Header from "../components/Header";
import type { UserProfile } from "../types";
import api from "../utils/api";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  function handleFollow() {
    console.log("follow or unfollow");
  }

  function countAuctionsByStatus(isClosed: boolean) {
    if (!user || !user.auctions) return 0;
    return user.auctions.filter((auction) => auction.closed === isClosed)
      .length;
  }

  return (
    <>
      <Header auth={isAuthenticated()} />
      <Flex align="center" justify="center" mt="xl" direction="column" mb="xl">
        {isLoading ? (
          <Loader />
        ) : !user ? (
          <h1>Profile not found</h1>
        ) : (
          <>
            <h1>{user.username}</h1>
            <Group>
              <h3>Followers: X</h3>
              <h3>Following: Y</h3>
            </Group>
            <Button onClick={handleFollow}>Follow</Button>
            <Group gap="xl" mt="xl">
              <Card>
                <h1>0/5</h1>
                <h3>Average Rating</h3>
              </Card>
              <Card>
                <h1>{countAuctionsByStatus(true)}</h1>
                <h3>Active Auctions</h3>
              </Card>
              <Card>
                <h1>{countAuctionsByStatus(false)}</h1>
                <h3>Finished Auctions</h3>
              </Card>
            </Group>
            {user.auctions.length > 0 ? (
              <>
                <h1>All auctions</h1>
                <AuctionsListing auctions={user.auctions} variant="wide" />
              </>
            ) : (
              <h1>This user hasn't created any auction</h1>
            )}
          </>
        )}
      </Flex>
    </>
  );
}
