import { Dispatch, SetStateAction } from "react";
import ReactImageMagnify from "react-image-magnify";

type GalleryProductType = {
  images: string[];
  setSelectedImage: Dispatch<SetStateAction<number>>;
  selectedImage: number;
};

const Gallery = ({
  images,
  selectedImage,
  setSelectedImage,
}: GalleryProductType) => {
  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images.map((image, index) => (
          <div
            onClick={() => setSelectedImage(index)}
            key={image}
            className={`product-gallery__thumb border-solid border-orange-400 ${
              index == selectedImage && "border-4"
            }`}
          >
            <img src={image} alt="" />
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        <ReactImageMagnify
          enlargedImagePosition="over"
          {...{
            smallImage: {
              alt: "Product image",
              isFluidWidth: true,
              src: images[selectedImage],
              height: 476,
            },
            largeImage: {
              src: images[selectedImage],
              width: 476 * 3,
              height: 476 * 3,
            },
          }}
        />
      </div>
    </section>
  );
};

export default Gallery;
