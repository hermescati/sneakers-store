import { CartItem } from "@/hooks/use-cart";
import { ProductSize } from "@/types";
import { Product } from "@/types/payload";

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

export function getMinimalPrice(product: Product) {
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

export function getProductPrice(size: ProductSize) {
  return size.discount ? size.price * (1 - size.discount) : size.price;
}

export function getCartTotal(cartItems: CartItem[]) {
  return cartItems.reduce((total, { size }) => {
    if (!size.stock) return total;

    const price = getProductPrice(size);
    return price + total;
  }, 0);
}

export function getImageURL(image: Product["images"][0]["image"]): string {
  return typeof image === "string" ? image : (image.url as string);
}

export function getThumbnailImage(product: Product): string {
  const image = product.images[0].image;
  return typeof image === "string"
    ? image
    : (image.sizes?.thumbnail?.url as string);
}
