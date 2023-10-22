import Layout from "../layouts/Main";
import PageIntro from "../components/page-intro";
import ProductsFeatured from "../components/products-featured";
import Footer from "../components/footer";
import useSwr from "swr";
import { MainCarousel } from "components/products-featured/carousel/MainCarousel";
import { useEffect, useState } from "react";
import { ProductType } from "types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
// import Subscribe from "../components/subscribe";

const IndexPage = () => {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data } = useSwr("/api/products", fetcher);
  // const [products, setProducts] = useState<ProductType[]>([]);
  const [antiVList, setAntiVList] = useState<ProductType[]>([]);
  const [protectionList, setProtectionList] = useState<ProductType[]>([]);
  const fetchProducts = async () => {
    await getDocs(collection(db, "ProgramDummyData")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as ProductType)
      );
      // setProducts(newData);
      // console.log(newData);
      setAntiVList(newData.filter((x) => x.category == "AntiVirus"));
      setProtectionList(newData.filter((x) => x.category == "Protection"));
    });
  };

  useEffect(() => {
    fetchProducts();
    // console.log(products);
  }, []);
  return (
    <Layout>
      <PageIntro />
      <MainCarousel
        carouselImages={["/images/featured1.jpg", "/images/featured2.jpg"]}
      />
      <ProductsFeatured products={protectionList} title="Protection" />
      <ProductsFeatured products={antiVList} title="Anti-Virus" />
      {/* <section className="featured">
        <div className="container">
          <article
            style={{ backgroundImage: "url(/images/featured-1.jpg)" }}
            className="featured-item featured-item-large"
          >
            <div className="featured-item__content">
              <h3>New arrivals are now in!</h3>
              <a href="#" className="btn btn--rounded">
                Show Collection
              </a>
            </div>
          </article>

          <article
            style={{ backgroundImage: "url(/images/featured-2.jpg)" }}
            className="featured-item featured-item-small-first"
          >
            <div className="featured-item__content">
              <h3>Basic t-shirts $29,99</h3>
              <a href="#" className="btn btn--rounded">
                More details
              </a>
            </div>
          </article>

          <article
            style={{ backgroundImage: "url(/images/featured-3.jpg)" }}
            className="featured-item featured-item-small"
          >
            <div className="featured-item__content">
              <h3>Sale this summer</h3>
              <a href="#" className="btn btn--rounded">
                VIEW ALL
              </a>
            </div>
          </article>
        </div>
      </section> */}

      <section className="section">
        <div className="container">
          <header className="section__intro">
            <h4>Why should you choose us?</h4>
          </header>

          <ul className="shop-data-items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>
                  All purchases over $199 are eligible for free shipping via
                  USPS First Class Mail.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-payment"></i>
              <div className="data-item__content">
                <h4>Easy Payments</h4>
                <p>
                  All payments are processed instantly over a secure payment
                  protocol.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Money-Back Guarantee</h4>
                <p>
                  If an item arrived damaged or you've changed your mind, you
                  can send it back for a full refund.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-materials"></i>
              <div className="data-item__content">
                <h4>Finest Quality</h4>
                <p>
                  Designed to last, each of our products has been crafted with
                  the finest materials.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* <Subscribe /> */}
      <Footer />
    </Layout>
  );
};

export default IndexPage;
