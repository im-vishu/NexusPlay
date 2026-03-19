import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GameGrid from "@/components/GameGrid";
import NewsFeed from "@/components/NewsFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <GameGrid />
      <NewsFeed />
    </div>
  );
};

export default Index;
