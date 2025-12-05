import { Box, Button, Flex, Group, Loader, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import AuctionsListing from "../components/AuctionsListing";
import PaginationComponent from "../components/PaginationComponent";
import type { Auction, UserProfile } from "../types";
import api from "../utils/api";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function UserProfile() {
  const auth = isAuthenticated();
  const { userId } = useParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersLength, setFollowersLength] = useState(0);
  const [followLoading, setFollowLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const [allAuctionsCount, setAllAuctionsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, auctionsResponse] = await Promise.all([
          api.get(`users/${userId}/`),
          api.get(`users/${userId}/auctions/?${searchParams.toString()}`),
        ]);
        console.log(userResponse.data);
        setUser(userResponse.data);
        setAuctions(auctionsResponse.data.results);
        setAllAuctionsCount(auctionsResponse.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, searchParams]);

  useEffect(() => {
    if (!user) return;

    setFollowersLength(user.followers.length);

    if (auth.userId !== user.id) {
      const following = user.followers.some((f) => f.id == auth.userId);
      setIsFollowing(following);
    }
  }, [user, auth.userId]);

  async function handleFollow() {
    if (!user) return;

    // API call to follow/unfollow
    try {
      setFollowLoading(true);
      await api.post(`/users/${userId}/follow/`);
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setFollowLoading(false);
    }

    // UI update
    if (isFollowing) {
      setFollowersLength((prev) => prev - 1);
    } else {
      setFollowersLength((prev) => prev + 1);
    }
    setIsFollowing((prev) => !prev);
  }

  return (
    <>
      <Flex align="center" justify="center" mt="xl" direction="column" mb="xl">
        {isLoading ? (
          <Loader />
        ) : !user ? (
          <h1>Profile not found</h1>
        ) : (
          <>
            <Text size="30px" fw={500}>
              {user.username}
            </Text>
            <Group>
              <h3>Followers: {followersLength}</h3>
              <h3>Following: {user.following.length}</h3>
            </Group>
            {auth.isAuthenticated && auth.userId != user.id && (
              <Button
                onClick={handleFollow}
                disabled={followLoading}
                variant={isFollowing ? "outline" : "filled"}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
            <Group gap="xl" mt="xl">
              <Box bg="dark.5" p="sm" bdrs="sm">
                <Text size="40px" fw={700}>
                  5.0
                </Text>
                <Text>Average Rating</Text>
              </Box>
              <Box bg="dark.5" p="sm" bdrs="sm">
                <Text size="40px" fw={700}>
                  {user.open_auctions_count}
                </Text>
                <Text>Active Auctions</Text>
              </Box>
              <Box bg="dark.5" p="sm" bdrs="sm">
                <Text size="40px" fw={700}>
                  {user.auctions_count}
                </Text>
                <Text>Created Auctions</Text>
              </Box>
            </Group>
            {auctions.length > 0 ? (
              <>
                <h1>All auctions</h1>
                <AuctionsListing auctions={auctions} variant="wide" />
                <PaginationComponent
                  currentPage={currentPage}
                  allAuctionsCount={allAuctionsCount}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              </>
            ) : (
              <Text fw={600} mt="xl" p="xl" size="30px">
                This user hasn't created any auction
              </Text>
            )}
          </>
        )}
      </Flex>
    </>
  );
}
