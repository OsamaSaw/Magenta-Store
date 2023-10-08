"use client";
// import useSwr from "swr";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { ProductType } from "types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../../firebase";

const ProductsContent = () => {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error } = useSwr("/api/products", fetcher);
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    await getDocs(collection(db, "ProgramDummyData")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newData);
      setProducts(newData);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // if (error) return <div>Failed to load users</div>;
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  // console.log(filter?.split(",")); //here an example to get an array of params
  return (
    <>
      {!products && <ProductsLoading />}

      {products && (
        <section className="products-list">
          {products.map((item: ProductType) => (
            <ProductItem
              id={item.id}
              name={item.name}
              price={item.price}
              key={item.id}
              image={item.image}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
