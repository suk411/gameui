import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DragonTigerGame from "@/components/DragonTigerGame";
import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return <DragonTigerGame />;
};

export default Index;
