import FeatureCard from "./FeatureCard"
import { features } from "../constants"

const Business = () => (
  <section className="sm:py-16 py-8">
    <div className="w-full flex flex-col justify-center items-center sm:mb-16 mb- relative">
      <h2 className="sid font-secondary text-center font-bold md:text-[64px] text-[32px] text-[#1B2AB8] xs:leading-[72px] leading-[47.39px] w-full">
        
        <div className="mt-3 sm:mt-10">Why Choose Metro</div>
      </h2>

      <div className="w-full text-center md:mt-16 mt-4 font-primary">
        <span className="font-normal side sm:text-center mt-20 sm:mt-10 text-[#010101] sm:text-2xl text-[17px] leading-[30.8px]">
          We believe our customers should be rewarded for the energy they choose.
        </span>
      </div>
    </div>

    <div className="flex scrollbar-hide overflow-x-scroll overflow-y-hidden gap-8 flex-nowrap sm:justify-start w-full mt-6 pt-12 sm:mt-0">
      {features?.map((card) => (
        <FeatureCard key={card.id} {...card} />
      ))}
    </div>
  </section>
);

export default Business;