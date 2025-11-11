import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function Home() {
  const [auth] = useState(isAuthenticated());
  const [auctions, setAuctions] = useState([]);

  async function fetchAuctions() {
    try {
      const response = await api.get("auctions/");
      console.log(response.data);
      setAuctions(response.data);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  }

  useEffect(() => {
    fetchAuctions();
  }, []);

  const auctionsElement = auctions.map((auction: any) => (
    <div key={auction.id}>
      <h4>{auction.name}</h4>
    </div>
  ));

  return (
    <>
      <Flex justify="center" mt="sm" direction="column" align="center" gap="sm">
        {auth && <h3>Logged in</h3>}
        <Link to="/">home screen</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/login">Login</Link>
        <Link to="/create">Create new auction</Link>
        {auctionsElement}
      </Flex>
    </>
  );
}
