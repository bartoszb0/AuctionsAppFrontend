import { useParams } from "react-router-dom";
import DataContentWrapper from "../../components/DataContentWrapper";
import isIdValid from "../../utils/isIdValid";
import NotFound from "../NotFound";
import FetchAuctionInformation from "./FetchAuctionInformation";

export default function Auction() {
  const { auctionId } = useParams();
  const { safeId, isValid } = isIdValid(auctionId);

  if (!isValid) return <NotFound />;

  return (
    <>
      <DataContentWrapper>
        <FetchAuctionInformation auctionId={safeId} />
      </DataContentWrapper>
    </>
  );
}
