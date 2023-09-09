import React from "react";
// import Footer from ".././components/Footer";
import Navbar from ".././components/Navbar";
import Register1 from ".././components/Register";

const Register = () => {
  return (
    <main className=" h-screen bg-[#F5F6FF]">
      <div className=" sm:px-16 px-6 py-6 flex justify-center items-center">
        <div className="xl:max-w-[1280px] w-full">
          <Navbar />
        </div>
      </div>

      <div className="flex justify-center bg-[#F5F6FF] items-start sm:px-16 px-6 py-6">
        <div className="xl:max-w-[1280px] w-full">
          <Register1 />
        </div>
      </div>

      {/* <div className="bg-[#1321a0] md:px-16 px-6 py-6 flex justify-center items-start">
        <div className="xl:max-w-[1280px] w-full">
          <Footer />
        </div>
      </div> */}
    </main>
  );
};

export default Register;
