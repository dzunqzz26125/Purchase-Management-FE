import FooterIntro from "../components/client/introduce/Footer";
import HeaderIntro from "../components/client/introduce/Header";
import HeroSection from "../components/client/introduce/HeroSection";
import ValuePropositions from "../components/client/introduce/sections/ValuePropositions";

const IntroducePage = () => {
  return (
    <>
      <HeaderIntro />
      <HeroSection />
      <ValuePropositions />
      <FooterIntro />
    </>
  );
};

export default IntroducePage;
