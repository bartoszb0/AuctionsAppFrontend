export type Auction = {
  id: number;
  name: string;
  description: string;
  starting_price: string;
  minimal_bid: string;
  created_on: string;
  closed: boolean;
  category: string;
  deadline: string;
  highest_bid: string;
  images: Image[];
};

export type Image = {
  id: number;
  image: string;
};

export type AuctionCardLayoutProps = {
  auction: Auction;
  formatDate: (date: string) => string;
};

export type Bid = {
  id: number;
  bidder: {
    id: number;
    username: string;
  };
  amount: string;
  placed_on: string;
};
