import { useState, useEffect } from "react";

interface MoodEntry {
  mood: string;
  emoji: string;
  date: string;
  time: string;
}

const moods = [
  { label: "Happy", emoji: "😊", color: "bg-green-100 border-green-300 hover:bg-green-200" },
  { label: "Neutral", emoji: "😐", color: "bg-yellow-100 border-yellow-300 hover:bg-yellow-200" },
  { label: "Sad", emoji: "😢", color: "bg-blue-100 border-blue-300 hover:bg-blue-200" },
  { label: "Angry", emoji: "😠", color: "bg-red-100 border-red-300 hover:bg-red-200" },
  { label: "Anxious", emoji: "😰", color: "bg-purple-100 border-purple-300 hover:bg-purple-200" },
];

const MoodTrackerPage = () => {
  const [history, setHistory] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("moodHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const selectMood = (mood: string, emoji: string) => {
    const entry: MoodEntry = {
      mood,
      emoji,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [entry, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem("moodHistory", JSON.stringify(updated));
  };

  // Simple chart: count moods
  const moodCounts = moods.map((m) => ({
    ...m,
    count: history.filter((h) => h.mood === m.label).length,
  }));
  const maxCount = Math.max(...moodCounts.map((m) => m.count), 1);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Mood Tracker</h1>
        <p className="text-sm text-muted-foreground mt-1">How are you feeling right now?</p>
      </div>

      {/* Mood selection */}
      <div className="flex flex-wrap justify-center gap-3">
        {moods.map((m) => (
          <button
            key={m.label}
            onClick={() => selectMood(m.label, m.emoji)}
            className={`${m.color} border-2 rounded-2xl px-5 py-4 flex flex-col items-center gap-1 transition-all hover:scale-105 active:scale-95`}
          >
            <span className="text-3xl">{m.emoji}</span>
            <span className="text-xs font-medium text-foreground">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Simple bar chart */}
      {history.length > 0 && (
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Mood Summary</h2>
          <div className="space-y-2">
            {moodCounts.map((m) => (
              <div key={m.label} className="flex items-center gap-3">
                <span className="text-lg w-8">{m.emoji}</span>
                <div className="flex-1 bg-secondary rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(m.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-6 text-right">{m.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3">Recent Entries</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {history.slice(0, 20).map((entry, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{entry.emoji}</span>
                  <span className="text-sm text-foreground">{entry.mood}</span>
                </div>
                <span className="text-xs text-muted-foreground">{entry.date} {entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTrackerPage;
