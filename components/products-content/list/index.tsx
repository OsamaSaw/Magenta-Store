"use client";
// import useSwr from "swr";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { ProductType } from "types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../../firebase";
import { Pagination } from "@mui/material";

function paginateArray(
  array: any[],
  currentPage: number,
  itemsPerPage: number
) {
  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Use slice to extract the items for the current page
  const pageItems = array.slice(startIndex, endIndex);

  return pageItems;
}

function calculateTotalPages(array: [], itemsPerPage: number) {
  if (itemsPerPage <= 0) {
    return 0; // Invalid itemsPerPage
  }

  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return totalPages;
}

const ProductsContent = () => {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error } = useSwr("/api/products", fetcher);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const itemsPerPage = 9;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
    setNumberOfPages(calculateTotalPages(products, itemsPerPage));
  }, []);

  // if (error) return <div>Failed to load users</div>;
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  // console.log(filter?.split(",")); //here an example to get an array of params
  return (
    <>
      {!products && <ProductsLoading />}

      {Boolean(products) && (
        <section className="products-list">
          {paginateArray(products, page, itemsPerPage).map(
            (item: ProductType) => (
              <ProductItem
                id={item.id}
                name={item.name}
                price={item.price}
                key={item.id}
                image={item.image}
              />
            )
          )}
        </section>
      )}
      <div className="w-full flex flex-row justify-center">
        <Pagination count={numberOfPages} page={page} onChange={handleChange} />
      </div>
    </>
  );
};

export default ProductsContent;
