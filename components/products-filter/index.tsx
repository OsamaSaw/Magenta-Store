import { useEffect, useState } from "react";
import Checkbox from "./form-builder/checkbox";
// import CheckboxColor from "./form-builder/checkbox-color";
import Slider from "rc-slider";

// data
// import productsTypes from "./../../utils/data/products-types";
// import productsColors from "./../../utils/data/products-colors";
// import productsSizes from "./../../utils/data/products-sizes";
import { videoGames } from "utils/data/MenuData";
import { useRouter } from "next/router";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ProductsFilter = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();
  const getUpdatedArray = (data: string[], key: string) => {
    const current = data?.find((item) => item === key);

    const updated = current
      ? data.filter((item) => item !== key)
      : [...data, key];

    return updated;
  };

  const handleClick = (key: string) => {
    const categories = getUpdatedArray(selectedCategories, key);
    setSelectedCategories(categories);

    if (!categories.length) {
      // If there are no selected categories, remove the 'filter' query parameter.
      router.push(
        {
          pathname: router.pathname,
          query: {},
        },
        undefined,
        { shallow: true }
      );
    } else {
      // Update the 'filter' query parameter with the selected categories.
      router.push(
        {
          pathname: router.pathname,
          query: { filter: categories.join(",") },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  useEffect(() => {
    if (!router?.isReady) return;

    const categoryQuery = router?.query?.filter;

    if (categoryQuery) {
      setSelectedCategories(categoryQuery?.split(","));
    }
  }, []);

  return (
    <form className="products-filter">
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${
          filtersOpen ? "products-filter__menu-btn--active" : ""
        }`}
      >
        Add Filter <i className="icon-down-open"></i>
      </button>

      <div
        className={`products-filter__wrapper ${
          filtersOpen ? "products-filter__wrapper--open" : ""
        }`}
      >
        <div className="products-filter__block">
          <button type="button">Product Category</button>
          <div className="products-filter__block__content">
            {videoGames.map((type, index) => (
              <Checkbox
                key={index}
                name="product-type"
                label={type.title}
                onChange={() => handleClick(type.title)}
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            <Range
              allowCross={false}
              min={0}
              max={20}
              defaultValue={[3, 10]}
              tipFormatter={(value) => `${value}$`}
              onChange={(value) => console.log(value)}
            />
          </div>
          <div className="flex flex-row justify-between">
            <span>0$</span>
            <span>20$</span>
          </div>
        </div>

        {/* <div className="products-filter__block">
          <button type="button">Size</button>
          <div className="products-filter__block__content checkbox-square-wrapper">
            {productsSizes.map((type) => (
              <Checkbox
                type="square"
                key={type.id}
                name="product-size"
                label={type.label}
              />
            ))}
          </div>
        </div> */}
      </div>
    </form>
  );
};

export default ProductsFilter;
