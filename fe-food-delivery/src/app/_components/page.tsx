import { FoodMenuSection } from "./FoodMenuSection";
import { Footer } from "./footer";
import { Header } from "./header";

export const HomeComponent = () => {
  return (
    <div>
      <main>
        <Header />

        <FoodMenuSection />

        <Footer />
      </main>
    </div>
  );
};
