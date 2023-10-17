import { ProductType, ProductTypeList } from "types";
import ProductsCarousel from "./carousel";

const ProductsFeatured = ({
  products,
  title,
}: {
  products: ProductType[];
  title: string;
}) => {
  return (
    <section className="section section-products-featured">
      <div className="myContainer">
        <header className="section-products-featured__header">
          <h3 className="ml-4">{title}</h3>
          <a href="/products" className="btn btn--rounded btn--border">
            Show All
          </a>
        </header>

        <ProductsCarousel products={products} />
      </div>
    </section>
  );
};

export default ProductsFeatured;
