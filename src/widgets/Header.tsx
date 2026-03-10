import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
      <Link to="/" className="text-xl font-bold">
        CryptoDashboard
      </Link>
      <Button variant="outline">Login</Button>
    </div>
  );
}

export default Header;
