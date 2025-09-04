import bannerImage from "@/assets/images/banner-4.jpg";
import FAQAccordion from "@/components/modules/Home/FAQAccordion";
import GallerySlider from "@/components/modules/Home/GallerySlider";
import MouwalGallerySlider from "@/components/modules/Home/MouwalGallerySlider";
import ProductsSection from "@/components/modules/Home/ProductsSection";
import SectionHeader from "@/components/modules/Home/SectionHeader";

const Home = () => {
  return (
    <div>
      <header>
        <img
          src={bannerImage}
          alt="Banner Image"
          className="w-full h-full object-cover "
        />
      </header>
      {/* Product Section */}
      <section className="my-12 max-w-7xl mx-auto px-4 w-full">
        <SectionHeader
          title="Our Products"
          subTitle="Explore our range of pure honey fresh from the hive and packed with natural goodness."
        />
        <ProductsSection />
      </section>

      {/* Gallery Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 w-full">
          {" "}
          <SectionHeader
            title="From Hive to Home"
            subTitle="Take a peek into our honey-making journey, from buzzing hives to the jars on your table."
          />
        </div>

        <GallerySlider />
      </section>
      {/* FAQ Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 w-full">
          <SectionHeader
            title="Frequently Asked Questions"
            subTitle="Find quick answers to the most common questions about our honey, sourcing, and delivery."
          />
        </div>
        <FAQAccordion />
      </section>
      {/* Mouwal Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 w-full">
          {" "}
          <SectionHeader
            title="Our Mouwal Gallery"
            subTitle="Discover moments captured through our journey. Explore a collection of visuals that reflect the beauty, creativity, and essence of Mouwal."
          />
        </div>

        <MouwalGallerySlider />
      </section>
    </div>
  );
};

export default Home;
