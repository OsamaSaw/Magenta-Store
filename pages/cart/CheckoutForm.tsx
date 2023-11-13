import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";

export default function CheckoutForm({ returnUrl }: { returnUrl: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (e) => {
    // e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: returnUrl,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="stripe">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <input
              className="form_white_input form__input--sm"
              type="text"
              placeholder="First name"
              name="firstName"
              ref={register({ required: true })}
              // value = {} check from a nextAuth
              //   disabled={} // check from a nextAuth
            />
            {errors.firstName && errors.firstName.type === "required" && (
              <p className="message message--error">This field is required</p>
            )}
          </div>
          <div className="form__col">
            <input
              className="form_white_input form__input--sm"
              type="text"
              placeholder="Email"
              name="email"
              ref={register({
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              // value = {} check from a nextAuth
              //   disabled={} // check from a nextAuth
            />
            {errors.email && errors.email.type === "required" && (
              <p className="message message--error">This field is required</p>
            )}

            {errors.email && errors.email.type === "pattern" && (
              <p className="message message--error">
                Please write a valid email
              </p>
            )}
          </div>
        </div>
        <PaymentElement
          className="payment-element"
          options={paymentElementOptions}
        />
        <button
          className="btn btn--rounded btn--yellow mt-5"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span className="button-text">
            {isLoading ? <div className="spinner" /> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div className="payment-message">{message}</div>}
      </form>
    </div>
  );
}
