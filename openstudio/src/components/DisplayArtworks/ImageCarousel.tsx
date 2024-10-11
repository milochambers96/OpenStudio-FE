import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "../../../styles/carousel-style.css";

import { IArtworkImage } from "../../interfaces/artworkImage";

interface ImageCarouselProps {
  images: IArtworkImage[];
}

function ImageCarousel({ images }: ImageCarouselProps) {
  const demoImages = [
    "https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1652366604/docs/demo_image5.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1652345874/docs/demo_image1.jpg",
  ];

  return (
    <div className="box">
      <Carousel useKeyboardArrows={true}>
        {demoImages.map((URL, index) => (
          <div className="slide">
            <img src={URL} alt="samplefile" key={index} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
