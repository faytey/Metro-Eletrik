const FeatureCard = ({ title, content }) => (
  <div className="border border-[#C5CBFD] min-w-[340px] sm:w-[400px] w-full flex flex-col justify-start sm:justify-center items-start sm:py-[23px] py-10 px-[26px] rounded-3xl  sm:max-h-fit bg-[#f5f6ff]">
    <div className="sm:mt-10 mt-0">
      <div className="flex flex-col">
        <h4 className="side font-normal text-[#010101] text-[24px] leading-[28px]">
          {title}
        </h4>
        <p className="font-normal grotesk text-[15px] text-[#010101] leading-[22.5px] my-4">
          {content}
        </p>
      </div>
    </div>
  </div>
);

export default FeatureCard;
