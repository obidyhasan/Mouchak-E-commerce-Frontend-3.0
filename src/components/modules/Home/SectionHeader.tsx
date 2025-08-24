type SectionHeaderProps = {
  title: string;
  subTitle: string;
};

const SectionHeader = ({ title, subTitle }: SectionHeaderProps) => {
  return (
    <div className="max-w-7xl mx-auto gap-2 mb-10 flex flex-col justify-center items-start sm:items-center">
      <h1 className="font-semibold text-xl sm:text-2xl text-primary">
        {title}
      </h1>
      <p className="text-start sm:text-center text-xs sm:text-sm">{subTitle}</p>
    </div>
  );
};

export default SectionHeader;
