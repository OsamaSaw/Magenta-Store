import { GetServerSideProps } from "next";

import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import ProductsFeatured from "../../components/products-featured";
import Gallery from "../../components/product-single/gallery";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import Reviews from "../../components/product-single/reviews";
import { server } from "../../utils/server";
import useSwr from "swr";
import { collection, addDoc, getDocs } from "firebase/firestore";
// types
import { ProductType } from "types";
import { db } from "../../firebase";

// type ProductPageType = {
//   product: ProductType;
// };

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pid = query.pid;
  // const res = await fetch(`${server}/api/product/${pid}`);
  // const product = await res.json();

  return {
    props: {
      pid,
    },
  };
};

const Product = ({ pid }: { pid: string }) => {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data } = useSwr("/api/products", fetcher);
  const [selectedImage, setSelectedImage] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType>();

  const fetchProducts = async () => {
    await getDocs(collection(db, "products")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(newData);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setSelectedProduct(products.find((x) => x.name == pid));
  }, [pid]);

  return (
    <Layout>
      <Breadcrumb />
      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery
              images={selectedProduct?.images || [""]}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <Content product={selectedProduct} />
          </div>
          <Description
            description={selectedProduct?.description}
            keyAct={selectedProduct?.keyAct}
            lang={selectedProduct?.lang}
            sysReq={selectedProduct?.sysReq}
          />
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured title="featured Items" products={products} />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;
