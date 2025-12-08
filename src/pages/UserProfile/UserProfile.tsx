import { useParams } from "react-router-dom";
import DataContentWrapper from "../../components/DataContentWrapper";
import FetchAuctionsPagination from "../../components/FetchAuctionsPagination";
import NotFound from "../NotFound";
import FetchUserInformation from "./FetchUserInformation";

export default function UserProfile() {
  const { userId } = useParams();
  const safeUserid = Number(userId);
  const isValid = !isNaN(safeUserid) && safeUserid > 0;

  if (!isValid) return <NotFound />;

  return (
    <>
      <DataContentWrapper>
        <FetchUserInformation userId={safeUserid} />
        <FetchAuctionsPagination
          endpoint={`users/${userId}/auctions/`}
          variant="wide"
          baseQueryKey={`user-${userId}-auctions`}
        />
      </DataContentWrapper>
    </>
  );
}
