import Hero from "../components/hero/Hero";
import CategorySection from "../components/category/CategorySection";
import NewArrivals from "../components/products/NewArrivals";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategorySection />
      <NewArrivals />
    </main>
  );
}