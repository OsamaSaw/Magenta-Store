import Layout from "../../layouts/Main";
import { useSelector } from "react-redux";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";
import { RootState } from "store";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { PaymentOptions } from "./PaymentOptions";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const CheckoutPage = () => {
  const priceTotal = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  });
  const { register, handleSubmit, errors } = useForm();
  const [option, setOption] = useState(0);

  const payNowRef = useRef();

  const onSubmit = async (data: any) => {
    console.log(data.email);
    payNowRef.current.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption((event.target as HTMLInputElement).value);
  };

  return (
    <Layout>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Payment</h3>
            <CheckoutStatus step="checkout" />
          </div>

          <div className="checkout-content">
            <div className="checkout__col-6">
              <div className="block">
                <h3 className="block__title">Shipping information</h3>
                <PaymentOptions
                  errors={errors}
                  onSubmit={onSubmit}
                  handleSubmit={handleSubmit}
                  register={register}
                  option={option}
                />
              </div>
            </div>

            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Payment method</h3>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={option}
                  onChange={handleChange}
                  sx={{ gap: 2 }}
                >
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label={
                      <div className="w-[300px] bg-white rounded-full p-4 flex flex-row justify-between">
                        <span
                          className={`text-sm ${
                            option == 0 ? "text-black" : "text-gray-400"
                          } font-medium`}
                        >
                          CREDIT CARD OR DEBIT CARD
                        </span>
                        <img
                          src="/images/logos/mastercard.png"
                          style={{ objectFit: "contain" }}
                          alt="Paypal"
                        />
                      </div>
                    }
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label={
                      <div className="w-[300px] bg-white rounded-full p-4 flex flex-row justify-between">
                        <span
                          className={`text-sm ${
                            option == 1 ? "text-black" : "text-gray-400"
                          } font-medium`}
                        >
                          PAYPAL PAYMENT
                        </span>
                        <img
                          src="/images/logos/paypal.png"
                          alt="Paypal"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    }
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label={
                      <div className="w-[300px] bg-white rounded-full p-4 flex flex-row justify-between">
                        <span
                          className={`text-sm ${
                            option == 2 ? "text-black" : "text-gray-400"
                          } font-medium`}
                        >
                          CRYPTOCURRENCY PAYMENTS
                        </span>
                        <img
                          src="/images/logos/binance.png"
                          width={60}
                          alt="Paypal"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    }
                  />
                </RadioGroup>
              </div>
            </div>

            <div className="checkout__col-2">
              <div className="block">
                <h3 className="block__title">Your cart</h3>
                <CheckoutItems />

                <div className="checkout-total">
                  <p>Total cost</p>
                  <h3>${priceTotal}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-actions cart-actions--checkout">
            <a href="/cart" className="cart__btn-back">
              <i className="icon-left"></i> Back
            </a>
            <div className="cart-actions__items-wrapper">
              <button type="button" className="btn btn--rounded btn--border">
                Continue shopping
              </button>

              {/* <button type="button" className="btn btn--rounded btn--yellow">
                Proceed to payment
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
