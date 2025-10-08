import { useState } from "react";
import DragonTigerGame from "@/components/DragonTigerGame";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return <DragonTigerGame />;
};

export default Index;
