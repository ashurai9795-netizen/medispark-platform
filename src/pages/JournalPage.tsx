import { useState, useEffect } from "react";

interface JournalEntry {
  id: number;
  text: string;
  date: string;
  time: string;
}

const JournalPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("journalEntries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const saveEntry = () => {
    if (!text.trim()) return;
    const entry: JournalEntry = {
      id: Date.now(),
      text: text.trim(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem("journalEntries", JSON.stringify(updated));
    setText("");
  };

  const deleteEntry = (id: number) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("journalEntries", JSON.stringify(updated));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Journal</h1>
        <p className="text-sm text-muted-foreground mt-1">Write your thoughts freely</p>
      </div>

      {/* Write area */}
      <div className="glass-card p-5 space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind today?"
          rows={5}
          className="w-full bg-secondary text-foreground rounded-xl p-4 text-sm outline-none resize-none focus:ring-2 focus:ring-ring transition-all"
        />
        <button
          onClick={saveEntry}
          disabled={!text.trim()}
          className="bg-primary text-primary-foreground rounded-full px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          Save Entry
        </button>
      </div>

      {/* Entries */}
      {entries.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Previous Entries</h2>
          {entries.map((entry) => (
            <div key={entry.id} className="glass-card-hover p-4 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs text-muted-foreground">{entry.date} at {entry.time}</span>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-xs text-destructive hover:underline"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalPage;
