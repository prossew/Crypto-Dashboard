import type { CoinInterface } from "../entities/coin/api";
import { useFavoriteStore } from "../features/auth/favorites/store";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

function CoinList({ coins }: { coins: CoinInterface[] }) {
  const { favorites, toggleFavorite } = useFavoriteStore();

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-2">
      {coins.map((coin) => {
        const isFavorite = favorites.some((f) => f.id === coin.id);
        return (
          <Card key={coin.id} className="flex items-center justify-between p-4">
            <Link to={`/coin/${coin.id}`} className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} width={42} height={42} />
              <span className="font-medium">{coin.name}</span>
              <span className="text-gray-500">{coin.symbol.toUpperCase()}</span>
              <span className="font-bold">${coin.current_price}</span>
            </Link>
            <button onClick={() => toggleFavorite(coin)}>
              {isFavorite ? "⭐" : "☆"}
            </button>
          </Card>
        );
      })}
    </div>
  );
}
export default CoinList;
