const RegisterPage = ({ nextSlide }: { nextSlide: () => void }) => (
  <div className="container">
    <div className="form-block">
      <h2 className="form-block__title">Sign Up</h2>
      <p className="form-block__description">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </p>

      <form className="form">
        <div className="form__input-row">
          <input className="form__input" placeholder="User Name" type="text" />
        </div>

        {/* <div className="form__input-row">
          <input className="form__input" placeholder="Last Name" type="text" />
        </div> */}

        <div className="form__input-row">
          <input className="form__input" placeholder="Email" type="text" />
        </div>

        <div className="form__input-row">
          <input
            className="form__input"
            type="Password"
            placeholder="Password"
          />
        </div>

        <div className="form__info">
          <div className="checkbox-wrapper">
            <label
              htmlFor="check-signed-up"
              className={`checkbox checkbox--sm`}
            >
              <input name="signed-in" type="checkbox" id="check-signed-up" />
              <span className="checkbox__check"></span>
              <p>I agree to the Terms of Service and Privacy Policy</p>
            </label>
          </div>
        </div>

        <button
          type="button"
          className="btn btn--rounded btn--yellow btn-submit"
        >
          Sign up
        </button>

        <p className="form__signup-link">
          <a onClick={nextSlide}>Are you already a member?</a>
        </p>
      </form>
    </div>
  </div>
);

export default RegisterPage;
