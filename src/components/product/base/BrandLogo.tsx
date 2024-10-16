import { Brand } from "@/types/payload";
import { Icon } from "@iconify/react";

interface BrandLogoProps {
  brand: Brand["name"];
  size?: string;
}

const BrandLogo = ({ brand, size }: BrandLogoProps) => {
  const getBrandName = () => {
    if (brand === "Yeezy") return "simple-icons:adidas";
    if (brand === "New Balance") return "simple-icons:newbalance";
    return `simple-icons:${brand.toLowerCase()}`;
  };

  return <Icon icon={getBrandName()} height={size} />;
};

export default BrandLogo;
