import { useDispatch } from "react-redux";
import { removeProduct, setCount } from "store/reducers/cart";
import { ProductStoreType } from "types";

const ShoppingCart = ({ image, name, id, count, price }: ProductStoreType) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(
      removeProduct({
        image,
        name,
        id,
        count,
        price,
      })
    );
  };

  const setProductCount = (count: number) => {
    if (count <= 0) {
      return;
    }

    const payload = {
      product: {
        image,
        name,
        id,
        count,
        price,
      },
      count,
    };

    dispatch(setCount(payload));
  };

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={image} alt="" />
          </div>

          <div className="cart-product__content">
            <h3>{name}</h3>
            <p>#{id}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="quantity-button">
          <button
            type="button"
            onClick={() => {
              count >= 2 && setProductCount(count - 1);
            }}
            className="quantity-button__btn"
          >
            -
          </button>
          <span className="!text-white">{count}</span>
          <button
            type="button"
            onClick={() => {
              count <= 8 && setProductCount(count + 1);
            }}
            className="quantity-button__btn"
          >
            +
          </button>
        </div>
      </td>
      <td className="!text-white">${price}</td>
      <td className="cart-item-cancel !text-white">
        <i className="icon-cancel" onClick={() => removeFromCart()}></i>
      </td>
    </tr>
  );
};

export default ShoppingCart;
