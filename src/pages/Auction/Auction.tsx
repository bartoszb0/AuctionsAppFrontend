import { useParams } from "react-router-dom";
import DataContentWrapper from "../../components/DataContentWrapper";
import NotFound from "../NotFound";
import FetchAuctionInformation from "./FetchAuctionInformation";

export default function Auction() {
  const { auctionId } = useParams();
  const safeAuctionId = Number(auctionId);
  const isValid = !isNaN(safeAuctionId) && safeAuctionId > 0;

  if (!isValid) return <NotFound />;

  return (
    <>
      <DataContentWrapper>
        <FetchAuctionInformation auctionId={safeAuctionId} />
      </DataContentWrapper>
    </>
  );
}
