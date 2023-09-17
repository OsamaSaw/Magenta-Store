"use client";
import useSwr from "swr";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { ProductTypeList } from "types";
import { useSearchParams } from "next/navigation";

const ProductsContent = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr("/api/products", fetcher);

  if (error) return <div>Failed to load users</div>;
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  // console.log(filter?.split(",")); //here an example to get an array of params
  return (
    <>
      {!data && <ProductsLoading />}

      {data && (
        <section className="products-list">
          {data.map((item: ProductTypeList) => (
            <ProductItem
              id={item.id}
              name={item.name}
              price={item.price}
              color={item.color}
              currentPrice={item.currentPrice}
              key={item.id}
              images={item.images}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
