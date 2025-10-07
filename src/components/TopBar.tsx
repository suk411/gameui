import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function TopBar() {
  const { signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="game-element text-white rounded-full bg-gray-800/70 border-gray-700 border-2 select-none p-3 z-30 hover:bg-gray-700/70 transition-colors cursor-pointer"
      style={{ top: '3%', left: '4%' }}
    >
      <LogOut size={20} />
    </button>
  );
}