import PerksSection from "@/components/home/PerksSection";
import MainContainer from "@/components/MainContainer";
import ProductReel from "@/components/product/ProductReel";

export default function Home() {
  return (
    <>
      <MainContainer>
        <ProductReel
          query={{ sort: "desc", limit: 6 }}
          title="New Releases"
          href="/sneakers/new-releases"
        />
      </MainContainer>
      <PerksSection />
    </>
  );
}
