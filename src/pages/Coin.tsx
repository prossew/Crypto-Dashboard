import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCoinsbyId } from "../entities/coin/api";
import Chart from "../widgets/Chart";
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
  if (!coin) return <div>Loading ...</div>;

  return (
    <div>
      <h1>{coin.name}</h1> 
      <Chart id={id!} days={days} />
      <button onClick={() => setDays(1)}>1D</button>
      <button onClick={() => setDays(7)}>1W</button>
      <button onClick={() => setDays(30)}>1M</button>
    </div>
  );
}

export default Coin;
