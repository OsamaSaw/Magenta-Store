import Layout from "../layouts/Main";
import Link from "next/link";
import { useForm } from "react-hook-form";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/router";
import { signIn, useSession, signOut } from "next-auth/react"; // signOut
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";

type LoginMail = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    console.log(session.user); // This will have user info like name, email, image, etc.
    // signOut()
    // If user is already logged in, redirect to home or dashboard
    router.push("/");
    // signOut()
    return null; // or
  }

  const onSubmit = async (data: LoginMail) => {
    signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })
      .then((result) => {
        if (result && result.error) {
          // Handle error
          console.log(result.error);
        } else {
          router.push("/profile"); // redirect to profile!!!

          // Successful sign in
          // Redirect or update UI as needed
        }
      })
      .catch((error) => {
        // Handle any other errors
        console.error("Sign in error:", error);
      });

    // const res = await postData(`${server}/api/login`, {
    //   email: data.email,
    //   password: data.password,
    // });
    // console.log(res);
  };
  const signUp = () => {
    router.push(
      {
        pathname: "/SignUp",
        // query: {
        //   pageId: "page-1", // update the query param
        // },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Layout>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Slide direction="left" appear={true} in={true}>
          <section className="form-page">
            <div className="container">
              <div className="back-button-section">
                <Link href="/products">
                  <i className="icon-left text-white"></i>{" "}
                  <span className="text-white">Back to store</span>
                </Link>
              </div>
              <div className="form-block">
                <h2 className="form-block__title">Log in</h2>
                <p className="form-block__description">Welcome back again</p>

                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form__input-row">
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

                  <div className="form__input-row">
                    <input
                      className="form__input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      ref={register({ required: true })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <p className="message message--error">
                        This field is required
                      </p>
                    )}
                  </div>

                  <div className="form__info">
                    <div className="checkbox-wrapper">
                      <label
                        htmlFor="check-signed-in"
                        className={`checkbox checkbox--sm`}
                      >
                        <input
                          type="checkbox"
                          name="keepSigned"
                          id="check-signed-in"
                          ref={register({ required: false })}
                        />
                        <span className="checkbox__check"></span>
                        <p>Keep me signed in</p>
                      </label>
                    </div>
                    <a
                      href="/forgot-password"
                      className="form__info__forgot-password text-white"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="form__btns">
                    <button type="button" className="btn-social google-btn">
                      <img src="/images/icons/gmail.svg" alt="gmail" /> Gmail
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn btn--rounded btn--yellow btn-submit"
                  >
                    Sign in
                  </button>

                  <p className="form__signup-link">
                    Not a member yet? <a onClick={signUp}>Sign up</a>
                  </p>
                </form>
              </div>
            </div>
          </section>
        </Slide>
      </Box>
    </Layout>
  );
};

export default LoginPage;
