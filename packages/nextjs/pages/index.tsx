import Business from "../components/Business";
// import Clients from "../components/Clients";
import Exist from "../components/Exist";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className=" h-screen bg-[#F5F6FF]">
      <div className=" sm:px-16 px-6 py-6 flex justify-center items-center">
        <div className="xl:max-w-[1280px] w-full">
          <Navbar />
        </div>
      </div>

      <div className="flex justify-center bg-[#F5F6FF] items-start sm:px-16 px-6 py-6">
        <div className="xl:max-w-[1280px] w-full">
          <Hero />
        </div>
      </div>

      {/* <div className=" bg-[#F5F6FF] flex justify-center items-start w-full">
        <Clients />
      </div> */}

      <div className="bg-[#F5F6FF] md:px-16 px-6 py-6 flex justify-center items-start">
        <div className="w-full">
          <Business />
        </div>
      </div>

      <div className="bg-flow-pattern bg-no-repeat bg-fill bg-bottom sm:bg-none bg-[#C5CBFD] flex justify-center items-start">
        <Exist />
      </div>

      {/* <div className="bg-[#F5F6FF] md:px-16 px-6 pt-6 pb-24 flex justify-center items-start">
        <div className="w-full">
          <Testimonials />
        </div>
      </div> */}

      <div className="bg-[#1321a0] md:px-16 px-6 py-6 flex justify-center items-start">
        <div className="xl:max-w-[1280px] w-full">
          <Footer />
        </div>
      </div>
    </main>
  );
}
