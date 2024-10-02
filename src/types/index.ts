export type ShoeModel = {
  label: string;
  href?: string;
};

export type PopularShoe = {
  label: string;
  value: string;
  imageSrc: string;
  href?: string;
};

export type FeaturedShoes = {
  shoes: ShoeModel[];
  popular?: PopularShoe[];
};

export type ProductCategory = {
  label: string;
  value: string;
  href?: string;
  featured?: FeaturedShoes;
};

export type ICartItem = {
  name: string;
  model: string;
  size: number;
  price: number;
};
