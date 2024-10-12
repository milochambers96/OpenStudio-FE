import { IMember } from "./member";
import { IArtworkImage } from "./artworkImage";

export interface IArtwork {
  id: number;
  title: string;
  artist: IMember;
  description: string;
  year: number;
  price: number;
  quantity_for_sale: number;
  isForSale: boolean;
  medium:
    | "painting"
    | "sculpture"
    | "digital_art"
    | "photography"
    | "mixed_media"
    | "printmaking"
    | "ceramics"
    | "textile";
  material: string;
  width: number;
  depth: number;
  height: number;
  weight: number;
  artworks_images: IArtworkImage[];
}

export type ArtworkFormData = Omit<
  IArtwork,
  "id" | "artist" | "artworks_images"
>;
