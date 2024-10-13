export interface IMember {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: "artist" | "collector";
  bio: string;
  website: string;
  address: string;
  postcode: string;
}

export interface LoginProps {
  fetchMember: () => void;
}
