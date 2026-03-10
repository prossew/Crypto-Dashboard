import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useFavoriteStore } from "@/features/auth/favorites/store";

function Header() {
  const { favorites } = useFavoriteStore();

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
      <Link to="/" className="text-xl font-bold">
        CryptoDashboard
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>⭐</span>
          <span>{favorites.length} избранных</span>
        </div>
        <Button variant="outline" size="lg">
          Login
        </Button>
      </div>
    </div>
  );
}

export default Header;
