import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Layout from "../layouts/Main";
import Link from "next/link";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LoginMail = {
  Email: string;
  Password: string;
  userName: string;
};
const SignUp = () => {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  // const onSubmit = async (data: LoginMail) => {
  //   console.log(data.userName);
  // };

  const registerUser = async (data: LoginMail) => {
    const auth = getAuth(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.Email,
        data.Password
      );
      const user = userCredential.user;

      // Update the user's profile with userName
      await updateProfile(user, {
        displayName: data.userName,
        // any other profile fields
      });

      console.log("User Created Successfully with username:", user.displayName);
      console.log(user);
      toast("User Created Successfully");
      setTimeout(() => {
        router.push("/");
      }, 5000);

      // Additional steps after successful registration
    } catch (error: any) {
      console.error("Error creating new user:", error.message);
      toast(
        "Error creating new user:" + error.message.replace("Firebase:", "")
      );
      // Handle errors
    }
  };

  const login = () => {
    router.push(
      {
        pathname: "/login",
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
        <Slide direction="right" appear={true} in={true}>
          <div className="container">
            <div className="back-button-section">
              <Link href="/">
                <i className="icon-left text-white"></i>
                <span className="text-white">Back to store</span>
              </Link>
            </div>
            <div className="form-block">
              <h2 className="form-block__title">Sign Up</h2>
              <p className="form-block__description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>

              <form className="form" onSubmit={handleSubmit(registerUser)}>
                <div className="form__input-row">
                  <input
                    className="form__input"
                    placeholder="User Name"
                    name="userName"
                    type="text"
                    ref={register({ required: true })}
                  />
                  {errors.userName && errors.userName.type === "required" && (
                    <p className="message message--error">
                      This field is required
                    </p>
                  )}
                </div>

                <div className="form__input-row">
                  <input
                    className="form__input"
                    placeholder="Email"
                    name="Email"
                    type="text"
                    ref={register({
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                  {errors.Email && errors.Email.type === "required" && (
                    <p className="message message--error">
                      This field is required
                    </p>
                  )}

                  {errors.Email && errors.Email.type === "pattern" && (
                    <p className="message message--error">
                      Please write a valid email
                    </p>
                  )}
                </div>

                <div className="form__input-row">
                  <input
                    className="form__input"
                    type="Password"
                    placeholder="Password"
                    name="Password"
                    ref={register({ required: true })}
                  />
                  {errors.Password && errors.Password.type === "required" && (
                    <p className="message message--error">
                      This field is required
                    </p>
                  )}
                </div>

                <div className="form__info">
                  <div className="checkbox-wrapper">
                    <label
                      htmlFor="check-signed-up"
                      className={`checkbox checkbox--sm`}
                    >
                      <input
                        name="signedIn"
                        type="checkbox"
                        id="check-signed-up"
                        ref={register({ required: true })}
                      />
                      <span className="checkbox__check"></span>
                      <p
                        className={`${
                          Boolean(
                            errors.signedIn &&
                              errors.signedIn.type === "required"
                          ) && "text-red-500 animate-pulse"
                        }`}
                      >
                        I agree to the Terms of Service and Privacy Policy
                      </p>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn--rounded btn--yellow btn-submit"
                >
                  Sign up
                </button>

                <p className="form__signup-link">
                  <a onClick={login}>Are you already a member?</a>
                </p>
              </form>
            </div>
          </div>
        </Slide>
      </Box>
      <ToastContainer closeOnClick />
    </Layout>
  );
};

export default SignUp;
