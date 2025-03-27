import Header from './components/LandingDisplay/LandingHeader'
import Hero from './components/LandingDisplay/LandingHero'

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Hero />
    </div>
  );
};

export default LandingPage;