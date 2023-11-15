import { GetServerSideProps } from "next";

import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import Gallery from "../../components/product-single/gallery";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
// import Reviews from "../../components/product-single/reviews";
// import { server } from "../../utils/server";
// import useSwr from "swr";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
// types
import { ProductDataType, ProductType } from "types";
import { db } from "../../firebase";
import ProductsFeatured from "components/products-featured";

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
  // const { data } = useSwr("/api/product", fetcher);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<ProductType>();
  const [productData, setProductData] = useState<ProductDataType>();

  const fetchProductData = async (product: ProductType) => {
    const q = query(
      collection(db, "ProgramConstData"),
      where(documentId(), "==", product?.ParentId || "45")
    );
    const querySnapshot = await getDocs(q);
    const newData: any = await querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    setProductData(newData[0]);
  };

  const searchForDocument = async (
    propertyName: string,
    propertyValue: string
  ) => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "PRODUCTS"),
        where(propertyName, "==", propertyValue)
      )
    );

    if (!querySnapshot.empty) {
      // If there is a matching document, you can access it like this:
      const doc = querySnapshot.docs[0];
      const data = doc.data() as any;
      // Do something with the document data
      await setProduct({
        ...data,
        id: doc.id,
      });
    } else {
      // No matching document found
      console.log("Document not found");
    }
  };

  useEffect(() => {
    searchForDocument("Url", pid);
  }, []);

  useEffect(() => {
    fetchProductData(product);
  }, [product]);
  return (
    <Layout>
      <Breadcrumb />
      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery
              images={productData?.Images || [""]}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <Content product={product} />
          </div>
          <Description data={productData} />
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured title="featured Items" products={[product]} />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;
