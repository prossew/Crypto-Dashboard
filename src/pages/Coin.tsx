import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCoinsbyId } from "../entities/coin/api";
import Chart from "../widgets/Chart";
import { Button } from "@/components/ui/button";

function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState<any>(null);
  const [days, setDays] = useState(7);

  useEffect(() => {
    async function fetchCoin() {
      const data = await getCoinsbyId(id!);
      setCoin(data);
    }
    fetchCoin();
  }, [id]);

  if (!coin) return <div className="p-6">Loading ...</div>;

  return (
    <div className="w-full p-6">
      <div className="flex items-center gap-3 mb-6">
        <img src={coin.image.large} alt={coin.name} width={48} height={48} />
        <h1 className="text-3xl font-bold">{coin.name}</h1>
        <span className="text-muted-foreground text-xl">
          {coin.symbol.toUpperCase()}
        </span>
      </div>

      <div className="rounded-[13px] border border-border overflow-hidden">
        <div className="flex gap-2 p-4">
          <Button
            className="rounded-full"
            variant={days === 1 ? "default" : "outline"}
            onClick={() => setDays(1)}
          >
            1D
          </Button>
          <Button
            className="rounded-full"
            variant={days === 7 ? "default" : "outline"}
            onClick={() => setDays(7)}
          >
            1W
          </Button>
          <Button
            className="rounded-full"
            variant={days === 30 ? "default" : "outline"}
            onClick={() => setDays(30)}
          >
            1M
          </Button>
        </div>
        <Chart id={id!} days={days} />
      </div>
    </div>
  );
}

export default Coin;
