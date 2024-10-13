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
  is_for_sale: boolean;
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

// export type ArtworkFormWithImages = ArtworkFormData & {
//   artworks_images: IArtworkImage[];
// };

export interface ArtworkFormWithImages extends ArtworkFormData {
  artworks_images: IArtworkImage[];
}

// import { IMember } from "./member";

// export type ArtworkImage = string | { image_url: string };

// export interface IArtwork {
//   id: number;
//   title: string;
//   artist: IMember;
//   description: string;
//   year: number;
//   price: number;
//   quantity_for_sale: number;
//   isForSale: boolean;
//   medium:
//     | "painting"
//     | "sculpture"
//     | "digital_art"
//     | "photography"
//     | "mixed_media"
//     | "printmaking"
//     | "ceramics"
//     | "textile";
//   material: string;
//   width: number;
//   depth: number;
//   height: number;
//   weight: number;
//   artworks_images: ArtworkImage[];
// }

// export type ArtworkFormData = Omit<
//   IArtwork,
//   "id" | "artist" | "artworks_images"
// >;

// export interface ArtworkFormWithImages extends ArtworkFormData {
//   artworks_images: ArtworkImage[];
// }
