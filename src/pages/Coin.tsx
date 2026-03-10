import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCoinsbyId } from "../entities/coin/api";

function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState<any>(null);

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
    </div>
  );
}

export default Coin;
