import { useState, useEffect, useRef } from "react";

const BreathingPage = () => {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");
  const [seconds, setSeconds] = useState(4);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) return;

    let s = 4;
    let currentPhase: "inhale" | "exhale" = "inhale";
    setPhase("inhale");
    setSeconds(4);

    intervalRef.current = setInterval(() => {
      s -= 1;
      if (s <= 0) {
        currentPhase = currentPhase === "inhale" ? "exhale" : "inhale";
        s = 4;
        setPhase(currentPhase);
      }
      setSeconds(s);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const toggle = () => {
    setActive((prev) => !prev);
    if (active && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Breathing Exercise</h1>
        <p className="text-sm text-muted-foreground mt-1">Follow the circle. Breathe slowly.</p>
      </div>

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center">
        <div
          className={`rounded-full transition-all duration-[4000ms] ease-in-out flex items-center justify-center ${
            active
              ? phase === "inhale"
                ? "w-56 h-56 bg-accent/20 border-4 border-accent shadow-[0_0_40px_hsl(var(--accent)/0.3)]"
                : "w-28 h-28 bg-primary/20 border-4 border-primary shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
              : "w-40 h-40 bg-secondary border-4 border-border"
          }`}
        >
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">
              {active ? (phase === "inhale" ? "Inhale" : "Exhale") : "Ready"}
            </p>
            {active && <p className="text-3xl font-bold text-primary mt-1">{seconds}</p>}
          </div>
        </div>
      </div>

      <button
        onClick={toggle}
        className={`rounded-full px-8 py-3 text-sm font-medium transition-all ${
          active
            ? "bg-destructive text-destructive-foreground hover:opacity-90"
            : "bg-accent text-accent-foreground hover:opacity-90"
        }`}
      >
        {active ? "Stop" : "Start Breathing"}
      </button>

      <div className="glass-card p-4 text-center max-w-sm">
        <p className="text-xs text-muted-foreground leading-relaxed">
          💡 <strong>Tip:</strong> Practice deep breathing for 2-5 minutes. Inhale through your nose, exhale through your mouth. This activates your body's relaxation response.
        </p>
      </div>
    </div>
  );
};

export default BreathingPage;
