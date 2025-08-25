import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router";

interface Contact7Props {
  title?: string;
  description?: string;
  emailLabel?: string;
  emailDescription?: string;
  email?: string;
  officeLabel?: string;
  officeDescription?: string;
  officeAddress?: string;
  phoneLabel?: string;
  phoneDescription?: string;
  phone?: string;
  chatLabel?: string;
  chatDescription?: string;
  chatLink?: string;
}

const Contact = ({
  title = "Contact Us",
  description = "Contact the support team at Moucak.",
  emailLabel = "Email",
  emailDescription = "We respond to all emails within 24 hours.",
  email = "hellomoucak@gmail.com",
  officeLabel = "Office",
  officeDescription = "Drop by our office for a chat.",
  officeAddress = "1 Eagle St, Brisbane, QLD, 4000",
  phoneLabel = "Phone",
  phoneDescription = "We're available Mon-Fri, 9am-5pm.",
  phone = "01861-610745",
  chatLabel = "Live Chat",
  chatDescription = "Get instant help from our support team.",
  chatLink = "Start Chat",
}: Contact7Props) => {
  const number = "8801861610745";

  return (
    <div className="max-w-7xl mx-auto px-4">
      <section className="bg-background py-6 sm:py-10">
        <div className="">
          <div className="mb-14">
            <h1 className="mb-3 mt-2 text-balance text-2xl font-semibold sm:text-3xl">
              {title}
            </h1>
            <p className="text-muted-foreground max-w-xl text-xs sm:text-sm">
              {description}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-muted rounded-lg p-6">
              <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
                <Mail className="h-6 w-auto" />
              </span>
              <p className="mb-2 text-lg font-semibold">{emailLabel}</p>
              <p className="text-muted-foreground mb-3 text-xs sm:text-sm">
                {emailDescription}
              </p>
              <Link
                to={`mailto:${email}`}
                className="font-semibold hover:underline"
              >
                {email}
              </Link>
            </div>
            <div className="bg-muted rounded-lg p-6">
              <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
                <MapPin className="h-6 w-auto" />
              </span>
              <p className="mb-2 text-lg font-semibold">{officeLabel}</p>
              <p className="text-muted-foreground mb-3 text-xs sm:text-sm">
                {officeDescription}
              </p>
              <Link to="/" className="font-semibold hover:underline">
                {officeAddress}
              </Link>
            </div>
            <div className="bg-muted rounded-lg p-6">
              <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
                <Phone className="h-6 w-auto" />
              </span>
              <p className="mb-2 text-lg font-semibold">{phoneLabel}</p>
              <p className="text-muted-foreground mb-3 text-xs sm:text-sm">
                {phoneDescription}
              </p>
              <Link
                to={`tel:${phone}`}
                className="font-semibold hover:underline "
              >
                {phone}
              </Link>
            </div>
            <div className="bg-muted rounded-lg p-6">
              <span className="bg-accent mb-3 flex size-12 flex-col items-center justify-center rounded-full">
                <MessageCircle className="h-6 w-auto" />
              </span>
              <p className="mb-2 text-lg font-semibold">{chatLabel}</p>
              <p className="text-muted-foreground mb-3 text-xs sm:text-sm">
                {chatDescription}
              </p>
              <Link
                to={`https://wa.me/${number}?text=Hello%20I%20am%20interested`}
                className="font-semibold hover:underline"
              >
                {chatLink}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
