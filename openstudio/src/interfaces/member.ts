export interface IMember {
  _id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: "artist" | "collector";
  bio: string;
  website: string;
  artist_address: string;
  collector_address: string;
}

export interface LoginProps {
  fetchMember: () => void;
}
