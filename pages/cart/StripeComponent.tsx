"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useMemo } from "react";
import CheckoutForm from "./CheckoutForm";

export const StripeComponent = ({
  clientSecret,
  publishableKey,
  returnUrl,
}: {
  clientSecret: string;
  publishableKey: string;
  returnUrl: string;
}) => {
  const stripePromise = useMemo(
    () => loadStripe(publishableKey),
    [publishableKey]
  );

  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          rules: {
            ".Label": {
              color: "white",
            },
          },
        },
      }}
      stripe={stripePromise}
    >
      <CheckoutForm returnUrl={returnUrl} />
    </Elements>
  );
};
