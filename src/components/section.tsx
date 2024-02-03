interface SectionProps {
  children: React.ReactNode;
  label: string;
  className?: string;
}
const Section = ({ children, label, className }: SectionProps) => {
  return (
    <section
      className={`relative border border-green-500 p-8 pt-12 rounded flex ${className}`}
    >
      <h2 className="text-lg mb-4 absolute top-0 l-4 -translate-y-1/2 z-10 px-2 py-1 border border-green-500 bg-[#cdf2f3] rounded">
        {label}
      </h2>
      <div className="w-full">{children}</div>
    </section>
  );
};

export { Section };
