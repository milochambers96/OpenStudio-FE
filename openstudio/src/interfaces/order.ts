export interface IOrder {
  id: number;
  buyer_info: BuyerInfo;
  seller_info: SellerInfo;
  artwork_info: ArtworkInfo;
  price: string;
  created_at: string;
  status:
    | "pending"
    | "accepted"
    | "ready to ship"
    | "shipped"
    | "completed"
    | "cancelled";
}

interface BuyerInfo {
  collector_address: string;
  email: string;
  id: number;
  username: string;
}

interface SellerInfo {
  artist_address: string;
  email: string;
  id: number;
  username: string;
}

interface ArtworkInfo {
  depth: string;
  height: string;
  width: string;
  weight: string;
  title: string;
  id: number;
}
