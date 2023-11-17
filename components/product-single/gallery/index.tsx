import { CircularProgress } from "@mui/material";
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
            {image ? <img src={image} alt="thumbnail" /> : <CircularProgress />}
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        {images[selectedImage] ? (
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
        ) : (
          <CircularProgress />
        )}
      </div>
      <div className="product-gallery__thumbsMobile">
        {images.map((image, index) => (
          <div
            onClick={() => setSelectedImage(index)}
            key={image}
            className={`thumbMobile mr-2 border-solid border-orange-400 ${
              index == selectedImage && "border-4"
            }`}
          >
            {image ? (
              <img
                className="w-full h-full object-contain"
                src={image}
                alt="thumbnail"
              />
            ) : (
              <CircularProgress />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
