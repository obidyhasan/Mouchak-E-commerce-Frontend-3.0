import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  const number = "8801339998774";

  return (
    <div className="min-h-screen flex flex-col">
      <Link
        to={`https://wa.me/${number}?text=Hello%20I%20am%20interested
`}
        target="_blank"
        className=" px-4 py-2 w-full bg-primary flex items-center justify-center"
      >
        <p className="text-center text-xs sm:text-sm">
          {`  আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন: 01339-998774`}
        </p>
      </Link>
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
