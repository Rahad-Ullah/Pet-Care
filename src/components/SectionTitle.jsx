
const SectionTitle = ({heading, subheading}) => {
    return (
        <div>
            <h4 className="text-xl font-bold text-primary mb-5">{subheading}</h4>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#454647] mb-6">{heading}</h1>
        </div>
    );
};

export default SectionTitle;