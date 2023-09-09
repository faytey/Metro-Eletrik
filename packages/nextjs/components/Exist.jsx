import React from "react";
import Image from "next/image";

const Exist = () => {
  return (
    <div className="md:flex gap-10 justify-start items-start sm:py-16 py-6 sm-px-16 px-6">
      <div className="md:w-[60%] px-5 sm:px-0">
        <div className="flex justify-start text-[#3849DD] gap-2 leading-6 sm:text-2xl text-[32px] font-secondary mb-12 sm:mb-6">
          Know <span className="text-white font-bold">About</span> Us
        </div>
        <div className="text-base side font-normal leading-normal text-white sm:text-black">
          <p className="pb-3 text-justify">
            Metro began with a question: What if we could make energy subscription easier for our user over the
            blockchain
          </p>
          <p className="pb-3 text-justify">
            Our team knew that would be a game chnager. Today we are making energy subscription easy for the african
            continent so people can increase productivity and level of economy in the nation.
          </p>
          <p className="text-justify">
            We are redefining what an energy provider can do for a community. As we continue to grow, we will roll out
            new, exclusive services to make our customers lives easier. Come along with Metro as we launch some big
            ideas that will shake things up and change the energy game for good.
          </p>
        </div>
      </div>
      <Image
        src="/know_the_team.png"
        alt="shelf"
        width={600}
        height={400}
        className="md:w-[40%] w-full hidden sm:block object-fill"
      />
    </div>
  );
};

export default Exist;
