import { useParams } from "react-router-dom";
import DataContentWrapper from "../../components/DataContentWrapper";
import FetchAuctionsPagination from "../../components/FetchAuctionsPagination";
import isIdValid from "../../utils/isIdValid";
import NotFound from "../NotFound";
import FetchUserInformation from "./FetchUserInformation";

export default function UserProfile() {
  const { userId } = useParams();
  const { safeId, isValid } = isIdValid(userId);

  if (!isValid) return <NotFound />;

  return (
    <>
      <DataContentWrapper>
        <FetchUserInformation userId={safeId} />
        <FetchAuctionsPagination
          endpoint={`users/${userId}/auctions/`}
          variant="wide"
          baseQueryKey={`user-${userId}-auctions`}
        />
      </DataContentWrapper>
    </>
  );
}
