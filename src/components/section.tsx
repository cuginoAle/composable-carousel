interface SectionProps {
  children: React.ReactNode;
  label: string;
}
const Section = ({ children, label }: SectionProps) => {
  return (
    <section className="relative border border-green-500 p-8 pt-12 rounded flex items-center">
      <h2 className="text-lg mb-4 absolute top-0 l-4 -translate-y-1/2 z-10 px-2 py-1 border border-green-500 bg-[#cdf2f3] rounded">
        {label}
      </h2>
      {children}
    </section>
  );
};

export { Section };
