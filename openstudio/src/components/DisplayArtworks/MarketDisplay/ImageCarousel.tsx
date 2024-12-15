import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { IArtworkImage } from "../../../interfaces/artworkImage";

interface ImageCarouselProps {
  images: IArtworkImage[];
}

function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <div className="os-subcontent-bk mt-5">
      <Carousel useKeyboardArrows={true}>
        {images.map((image, index) => (
          <div key={image.id || index} className="slide">
            <img
              src={image.image_url}
              alt={`An image of ${image.artwork.title} by ${image.artwork.artist}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
