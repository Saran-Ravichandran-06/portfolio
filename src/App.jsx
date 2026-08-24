import { useEffect, useState } from "react";
import PortfolioScene from "./components/PortfolioScene";
import StaticFallback from "./components/StaticFallback";

export default function App() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    setReady(true);
    const listener = (e) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", listener);
    return () => mq.removeEventListener?.("change", listener);
  }, []);

  if (!ready) return null;

  return reduceMotion ? <StaticFallback /> : <PortfolioScene />;
}
