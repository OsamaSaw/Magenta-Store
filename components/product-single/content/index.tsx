import { useState } from "react";
// import productsColors from "./../../../utils/data/products-colors";
// import productsSizes from "./../../../utils/data/products-sizes";
// import CheckboxColor from "./../../products-filter/form-builder/checkbox-color";
import { useDispatch, useSelector } from "react-redux";
import { some } from "lodash";
import { addProduct } from "store/reducers/cart";
import { toggleFavProduct } from "store/reducers/user";
import { ProductType, ProductStoreType } from "types";
import { RootState } from "store";

type ProductContent = {
  product: ProductType;
};

const Content = ({ product }: ProductContent) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [itemSize, setItemSize] = useState<string>("");

  // const onColorSet = (e: string) => setColor(e);
  // const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
  //   setItemSize(e.target.value);

  const { favProducts } = useSelector((state: RootState) => state.user);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id
  );

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id: product.id,
      })
    );
  };

  const addToCart = () => {
    const productToSave: ProductStoreType = {
      id: product.id,
      name: product.name,
      thumb: product.images ? product.images[0] : "",
      price: product?.price - product?.discount,
      count: count,
    };

    const productStore = {
      count,
      product: productToSave,
    };

    dispatch(addProduct(productStore));
  };

  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">
          Product ID:<br></br>
          {product?.id}
        </h5>
        {!product?.price && <span className="product-on-sale">Sale</span>}
        <h2 className="product__name">{product?.name}</h2>
        <div className="product__prices">
          <h4>${product?.price - product?.discount}</h4>
          {product?.discount && (
            <span className="line-through">${product.price}</span>
          )}
        </div>
      </div>

      <div className="product-content__filters">
        {/* <div className="product-filter-item">
          <h5>Color:</h5>
          <div className="checkbox-color-wrapper">
            {productsColors.map(type => (
              <CheckboxColor 
                key={type.id} 
                type={'radio'} 
                name="product-color" 
                color={type.color}
                valueName={type.label}
                onChange={onColorSet} 
              />
            ))}
          </div>
        </div> */}
        {/* <div className="product-filter-item">
          <h5>
            Size: <strong>See size table</strong>
          </h5>
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
              <select onChange={onSelectChange}>
                <option>Choose size</option>
                {productsSizes.map((type) => (
                  <option value={type.label}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div> */}
        <div className="product-filter-item">
          <h5 className="text-white">Quantity:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button
                type="button"
                onClick={() => {
                  count >= 2 && setCount(count - 1);
                }}
                className="quantity-button__btn"
              >
                -
              </button>
              <span className="!text-white">{count}</span>
              <button
                type="button"
                onClick={() => {
                  count <= 8 && setCount(count + 1);
                }}
                className="quantity-button__btn"
              >
                +
              </button>
            </div>

            <button
              type="submit"
              onClick={() => addToCart()}
              className="btn btn--rounded btn--yellow"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
