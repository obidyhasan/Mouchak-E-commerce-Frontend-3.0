import logo from "@/assets/icons/logo-icon.svg";
import { Button } from "@/components/ui/button";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const About = ({
  title = "About Us",
  description = "Pure, natural honey delivered from the hive to your home. Taste the sweetness of nature with our premium, sustainably sourced honey products.",
  mainImage = {
    src: "https://res.cloudinary.com/dpxcavixq/image/upload/v1756967756/Artboard_2_np7b1t.jpg",
    alt: "placeholder",
  },
  secondaryImage = {
    src: "https://res.cloudinary.com/dpxcavixq/image/upload/v1756967756/Artboard_2_np7b1t.jpg",
    alt: "placeholder",
  },
  breakout = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "logo",
    title: "moucak.com",
    description: "Pure, natural honey delivered from the hive to your home.",
    buttonText: "Discover more",
    buttonUrl: "https://facebook.com",
  },
}: About3Props = {}) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <section className="py-6 sm:py-10">
        <div className="">
          <div className="mb-10">
            <h1 className="mb-3 mt-2 text-balance text-2xl font-semibold sm:text-3xl">
              {title}
            </h1>
            <p className="text-muted-foreground max-w-xl text-xs sm:text-sm">
              {description}
            </p>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
            />
            <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
              <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
                <img src={logo} className="w-24" alt="logo" />
                <div>
                  <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                  <p className="text-muted-foreground">
                    {breakout.description}
                  </p>
                </div>
                <Button variant="outline" className="mr-auto" asChild>
                  <a href={breakout.buttonUrl} target="_blank">
                    {breakout.buttonText}
                  </a>
                </Button>
              </div>
              <img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
