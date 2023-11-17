import { StripeComponent } from "./StripeComponent";

export const PaymentOptions = ({
  onSubmit,
  option,
  register,
  handleSubmit,
  errors,
}: {
  onSubmit: (data: any) => Promise<void>;
  option: number;
  register: any;
  handleSubmit: any;
  errors: any;
}) => {
  if (option == 0) {
    return (
      <>
        <StripeComponent
          clientSecret={
            "pi_1Gt0KQ2eZvKYlo2CeWXUgmhy_secret_vb9O3Xyss5zs1TZTH5w84FOYG"
          }
          publishableKey={"pk_test_6pRNASCoBOKtIshFeQd4XMUh"}
          returnUrl="http://localhost:3000/cart/payment/thankYou"
        />
      </>
    );
  } else if (option == 1) {
    return (
      <>
        {"userName" ? (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input-row space-y-4">
              <div className="form__col">
                <input
                  className="form__input"
                  placeholder="email"
                  type="text"
                  name="email"
                  ref={register({
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />

                {errors.email && errors.email.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}

                {errors.email && errors.email.type === "pattern" && (
                  <p className="message message--error">
                    Please write a valid email
                  </p>
                )}
              </div>
              <div className="form__col">
                <input
                  className="form__input form__input--sm"
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  ref={register({ required: true })}
                  // value = {} check from a nextAuth
                  //   disabled={} // check from a nextAuth
                />
                {errors.firstName && errors.firstName.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
              </div>
            </div>
          </form>
        ) : (
          <>
            <img style={{ width: 350 }} src="/images/checkout.png" />
          </>
        )}
      </>
    );
  } else if (option == 2) {
    return <></>;
  } else {
    return <></>;
  }
};
