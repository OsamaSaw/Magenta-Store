import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ProductTypeList } from "types";

const ProductItem = ({
  discount,
  image,
  id,
  name,
  price,
  url,
  devices,
  years,
}: ProductTypeList) => {
  const [isHoverEnabled, setIsHoverEnabled] = useState(false);
  const router = useRouter();
  return (
    <div
      onMouseOver={() => setIsHoverEnabled(true)}
      onMouseOut={() => setIsHoverEnabled(false)}
      className="product-item transition ease-in-out hover:drop-shadow-glow"
    >
      {isHoverEnabled && (
        <>
          <button
            type="button"
            onClick={() => {}}
            className="z-40 absolute left-[50%] top-[55%] -mt-[60px] w-28 -ml-[56px] bg-[#FBB03B] text-white rounded-full p-2"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={() => {
              router.push(`/product/${url}`);
            }}
            className="z-40 absolute left-[50%] top-[35%] -mt-[60px] w-28 -ml-[56px] bg-[#FBB03B] text-white rounded-full p-2"
          >
            See Details
          </button>
        </>
      )}
      <Link href={`/product/${url}`}>
        <div className="product__image">
          <img
            src={image}
            alt="product"
            className={`transition ease-in-out ${
              isHoverEnabled && "blur-[2px]"
            }`}
          />
          {discount != 0 && (
            <span className="product__discount">{discount}%</span>
          )}
        </div>
        <div className="product__description">
          <h3>{name}</h3>
          <span className="text-white text-sm mb-2">
            {devices + " / " + years}
          </span>
          <div
            className={
              "product__price " + (discount ? "product__price--discount" : "")
            }
          >
            <h4>{"$ " + (price - (discount ?? 0)).toFixed(2)}</h4>

            {discount != 0 && (
              <del>
                <span>${price}</span>
              </del>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
