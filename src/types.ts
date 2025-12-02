export type Auction = {
  id: number;
  name: string;
  description: string;
  author: User;
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
  bidder: User;
  amount: string;
  placed_on: string;
};

export type User = {
  id: number;
  username: string;
};

export type UserProfile = User & {
  auctions: Auction[];
};
