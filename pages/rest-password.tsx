import Layout from "../layouts/Main";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { useRouter } from 'next/router';
// import { server } from "../utils/server";
// import { postData } from "../utils/services";

type ResetPasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const { register, handleSubmit, errors, getValues } = useForm();
  const router = useRouter();
  const oobCode = router.query.oobCode as string;

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      // Handle the case where passwords do not match
      console.error('Passwords do not match');
      return;
    }
    try {
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode, data.newPassword);
      // Handle successful password reset: show message, redirect, etc.
      console.log("Password reset Success")
    } catch (error) {
      console.error('Error resetting password:', error);
      // Handle errors (display error message to the user)
    }
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <i className="icon-left"></i> Back to shop
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Reset your password</h2>
            <p className="form-block__description">
              Enter your new password below
            </p>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__input-row">
                <input
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    ref={register({ required: true, minLength: 6 })}
                />
                {errors.newPassword && <span>Password is required and should be at least 6 characters</span>}


                {errors.newPassword && errors.newPassword.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}

              </div>

              <div className="form__input-row">
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm New Password"
                    ref={register({ required: true, validate: (value) => value === getValues('newPassword') })}
                />
                {errors.confirmPassword && <span>Passwords do not match</span>}

                {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                  <p className="message message--error">
                    This field is required
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResetPassword;
