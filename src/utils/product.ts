import { Product } from "@/types/payload";

export function getPriceInfo(product: Product) {
  const minPriceInfo = product.available_sizes.reduce(
    (min, size) => {
      const regularPrice = size.price ?? Infinity;
      const discountedPrice = size.discount
        ? regularPrice * (1 - size.discount)
        : regularPrice;

      if (discountedPrice < min.discountedPrice) {
        return { regularPrice, discountedPrice };
      }

      return min;
    },
    { regularPrice: Infinity, discountedPrice: Infinity }
  );

  return {
    regularPrice: minPriceInfo.regularPrice,
    discountedPrice:
      minPriceInfo.discountedPrice !== minPriceInfo.regularPrice
        ? minPriceInfo.discountedPrice
        : null,
  };
}

export function getProductInfo(product: Product) {
  const brand =
    typeof product.brand === "string" ? product.brand : product.brand.name;
  const model =
    typeof product.model === "string" ? product.model : product.model.name;

  return { brand, model };
}

export function formatCategory(category: Product["category"]) {
  if (!category) return "";
  return category.charAt(0).toUpperCase() + category.slice(1);
}
