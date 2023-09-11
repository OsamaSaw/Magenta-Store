type ProductDescriptionType = {
  description: string;
};

const Description = ({ description }: ProductDescriptionType) => {
  return (
    <section className="product-single__description">
      <div className="product-description-block">
        <i className="icon-cart"></i>
        <h4>Details and product description</h4>
        <p>
          {description}
          {/* White Summer Vibes T-shirt in the uiKit line with a colorful print.{" "}
          <br></br>Made of jersey cotton. T-shirt fits perfectly with jeans,
          pants or shorts. */}
        </p>
      </div>
    </section>
  );
};

export default Description;
