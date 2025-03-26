import Header from './Landing-header';
import Hero from './Landing-hero'

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Hero />
    </div>
  );
};

export default LandingPage;