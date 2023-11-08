export const PaymentOptions = ({
  onSubmit,
  option,
  register,
  handleSubmit,
}: {
  onSubmit: (data: any) => Promise<void>;
  option: number;
  register: any;
  handleSubmit: any;
}) => {
  if (option == 0) {
    return (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <input
              className="form__input form__input--sm"
              type="text"
              placeholder="Email"
              ref={register({ required: true })}
              // value = {} check from a nextAuth
              //   disabled={} // check from a nextAuth
            />
          </div>

          <div className="form__col">
            <input
              className="form__input form__input--sm"
              type="text"
              placeholder="Address"
              ref={register({ required: true })}
            />
          </div>
        </div>

        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <input
              className="form__input form__input--sm"
              type="text"
              placeholder="First name"
              ref={register({ required: true })}
              // value = {} check from a nextAuth
              //   disabled={} // check from a nextAuth
            />
          </div>

          <div className="form__col">
            <input
              className="form__input form__input--sm"
              type="text"
              placeholder="City"
              ref={register({ required: true })}
            />
          </div>
        </div>

        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <input
              className="form__input form__input--sm"
              type="text"
              placeholder="Last name"
              ref={register({ required: true })}
            />
          </div>

          <div className="form__col">
            <input
              className="form__input form__input--sm"
              type="text"
              placeholder="Postal code / ZIP"
              ref={register({ required: true })}
            />
          </div>
        </div>

        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <input
              className="form__input form__input--sm"
              type="text"
              placeholder="Phone number"
            />
          </div>

          <div className="form__col">
            <div className="select-wrapper select-form">
              <select>
                <option>Country</option>
                <option value="Argentina">Argentina</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    );
  } else if (option == 1) {
    return (
      <>
        <span>All set, click processed to continue</span>
        <img src="/images/checkout.png" />
      </>
    );
  } else if (option == 2) {
    return <></>;
  } else {
    return <></>;
  }
};
