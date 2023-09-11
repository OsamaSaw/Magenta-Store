import Link from "next/link";
import { ProductTypeList } from "types";

const ProductItem = ({
  discount,
  images,
  id,
  name,
  price,
  currentPrice,
}: ProductTypeList) => {
  return (
    <div className="product-item">
      <div className="product__image">
        <Link href={`/product/${id}`}>
          <img src={images ? images[0] : ""} alt="product" />
          {discount && <span className="product__discount">{discount}%</span>}
        </Link>
      </div>

      <div className="product__description">
        <h3>{name}</h3>
        <div
          className={
            "product__price " + (discount ? "product__price--discount" : "")
          }
        >
          <h4>${currentPrice}</h4>

          {discount && (
            <del>
              <span>${price}</span>
            </del>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
