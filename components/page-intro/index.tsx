import { useWindowSize } from "components/header/useWindowSize";
import { useState } from "react";

const PageIntro = () => {
  const [loading, setLoading] = useState(true);
  const size = useWindowSize();
  return (
    <section className="page-intro">
      {loading && (
        <img
          src={
            size.width >= 767
              ? "/images/placeholder.jpg"
              : "/images/placeholder2.jpg"
          }
          style={{ objectFit: "cover" }}
          className={`${
            size.width >= 767 ? "h-[90vh]" : "h-[450px]"
          } w-full relative`}
        />
      )}
      <img
        src={
          size.width >= 767 ? "/images/cypherKeys.gif" : "/images/mobile.gif"
        }
        style={{ objectFit: "cover", display: loading ? "none" : "block" }}
        className={`${
          size.width >= 767 ? "h-[90vh]" : "h-[450px]"
        } w-full relative`}
        onLoad={(e) => {
          setLoading(false);
        }}
      />

      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>On purchases over $199</p>
              </div>
            </li>

            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>99% Satisfied Customers</h4>
                <p>Our clients' opinions speak for themselves</p>
              </div>
            </li>

            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Originality Guaranteed</h4>
                <p>30 days warranty for each product from our store</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PageIntro;
