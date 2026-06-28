import { useState, useCallback } from "react";
import CubePortfolio from "@/components/CubePortfolio";
import TerminalLoader from "@/components/TerminalLoader";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <TerminalLoader onComplete={handleComplete} />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <CubePortfolio />
      </div>
    </>
  );
};

export default Index;
