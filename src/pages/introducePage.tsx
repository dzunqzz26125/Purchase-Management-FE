import FooterIntro from "../components/client/introduce/Footer";
import HeaderIntro from "../components/client/introduce/Header";
import HeroSection from "../components/client/introduce/HeroSection";

const IntroducePage = () => {
  return (
    <div className="bg-background text-on-surface">
      <HeaderIntro />
      <main>
        <HeroSection />
      </main>
      <FooterIntro />
    </div>
  );
};

export default IntroducePage;
