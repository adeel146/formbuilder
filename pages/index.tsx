import Footer from "components/Footer";
import Header from "components/Header";
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const MainArea = dynamic(() => import("components/MainArea"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen flex bg-[#F1F5FA]">
      <div className="m-4 border flex flex-1 flex-col rounded-2xl overflow-hidden">
        <Header />
        <MainArea />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
