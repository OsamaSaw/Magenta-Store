import Layout from "../layouts/Main";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { server } from "../utils/server";
import { postData } from "../utils/services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import RegisterPage from "./RegisterPage";
import { useRef } from "react";

type LoginMail = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const swiperRef = useRef();

  const onSubmit = async (data: LoginMail) => {
    const res = await postData(`${server}/api/login`, {
      email: data.email,
      password: data.password,
    });

    console.log(res);
  };
  const nextSlice = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <i className="icon-left text-white"></i>{" "}
              <span className="text-white">Back to store</span>
            </Link>
          </div>

          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            navigation={false}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper select-none swiper-no-swiping"
          >
            <SwiperSlide>
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

                  {/* <div className="form__btns">
                <button type="button" className="btn-social fb-btn">
                  <i className="icon-facebook"></i>Facebook
                </button>
                <button type="button" className="btn-social google-btn">
                  <img src="/images/icons/gmail.svg" alt="gmail" /> Gmail
                </button>
              </div> */}

                  <button
                    type="submit"
                    className="btn btn--rounded btn--yellow btn-submit"
                  >
                    Sign in
                  </button>

                  <p className="form__signup-link">
                    Not a member yet? <a onClick={nextSlice}>Sign up</a>
                  </p>
                </form>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <RegisterPage nextSlide={nextSlice} />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
