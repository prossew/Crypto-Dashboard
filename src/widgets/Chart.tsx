import { useEffect, useRef } from "react";
import { createChart, AreaSeries } from "lightweight-charts";
import { getCoinChart } from "../entities/coin/api";

export interface ChartProps {
  id: string;
  days: number;
}

function Chart({ id, days }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,
      layout: {
        background: { color: "#111111" },
        textColor: "#9ca3af",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "#1f1f1f" },
      },
      crosshair: {
        vertLine: { color: "#6366f1" },
        horzLine: { color: "#6366f1" },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
      },
    });

    const lineSeries = chart.addSeries(AreaSeries, {
      lineColor: "#6366f1",
      topColor: "rgba(99, 102, 241, 0.4)",
      bottomColor: "rgba(99, 102, 241, 0.0)",
      lineWidth: 2,
      priceLineVisible: false,
    });

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    });

    resizeObserver.observe(container);

    async function fetchChart() {
      const data = await getCoinChart(id, days);
      const formattedData = data.prices.map(([time, value]) => ({
        time: Math.floor(time / 1000) as any,
        value,
      }));
      lineSeries.setData(formattedData);
    }

    fetchChart();

    return () => {
      chart.remove();
      resizeObserver.disconnect();
    };
  }, [id, days]);

  return <div ref={chartContainerRef} className="w-full h-[800px]" />;
}

export default Chart;