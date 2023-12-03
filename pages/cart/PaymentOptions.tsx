import { useForm } from "react-hook-form";
import { StripeComponent } from "./StripeComponent";
import { signIn, useSession, signOut } from "next-auth/react"; // signOut

export const PaymentOptions = ({ option }: { option: number }) => {
  const { data: session } = useSession();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data.email ?? session?.user?.email);
    console.log(data.firstName ?? session?.user?.name);
  };
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
        {!session?.user ? (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input-row form__input-row--two">
              <div className="form__col">
                <input
                  className="form_white_input form__input--sm"
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  ref={register({ required: true })}
                />
                {errors.firstName && errors.firstName.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
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
            </div>
            <button
              type="submit"
              className="btn btn--rounded btn--yellow mt-5"
              id="submit"
            >
              <span className="button-text">Proceed to payment</span>
            </button>
          </form>
        ) : (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <img style={{ width: 350 }} src="/images/checkout.png" />
            <button
              type="submit"
              className="btn btn--rounded btn--yellow mt-5 "
              id="submit"
            >
              <span className="button-text">Proceed to payment</span>
            </button>
          </form>
        )}
      </>
    );
  } else if (option == 2) {
    return (
      <>
        {!session?.user ? (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input-row form__input-row--two">
              <div className="form__col">
                <input
                  className="form_white_input form__input--sm"
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  ref={register({ required: true })}
                />
                {errors.firstName && errors.firstName.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
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
            </div>
            <button
              type="submit"
              className="btn btn--rounded btn--yellow mt-5"
              id="submit"
            >
              <span className="button-text">Proceed to payment</span>
            </button>
          </form>
        ) : (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <img style={{ width: 350 }} src="/images/checkout.png" />
            <button
              type="submit"
              className="btn btn--rounded btn--yellow mt-5"
              id="submit"
            >
              <span className="button-text">Proceed to payment</span>
            </button>
          </form>
        )}
      </>
    );
  } else {
    return <></>;
  }
};
