import { Link } from "react-router-dom";

const features = [
  { to: "/chat", emoji: "💬", title: "Chat Companion", desc: "Talk about your feelings with a supportive companion" },
  { to: "/mood", emoji: "🎭", title: "Mood Tracker", desc: "Track and visualize your daily moods" },
  { to: "/journal", emoji: "📔", title: "Journal", desc: "Write your thoughts and reflect" },
  { to: "/breathing", emoji: "🌬️", title: "Breathing Exercise", desc: "Calm your mind with guided breathing" },
];

const MentalHealthHome = () => {
  const now = new Date();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">MindSpace</h1>
        <p className="text-muted-foreground">Your mental health companion</p>
        <p className="text-xs text-muted-foreground">
          {now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          {" • "}
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <Link
            key={f.to}
            to={f.to}
            className="glass-card-hover p-6 flex flex-col items-center text-center gap-3 hover:scale-[1.02] transition-transform"
          >
            <span className="text-4xl">{f.emoji}</span>
            <h2 className="text-lg font-semibold text-foreground">{f.title}</h2>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </Link>
        ))}
      </div>

      <div className="glass-card p-5 text-center">
        <p className="text-sm text-muted-foreground italic">
          "You don't have to control your thoughts. You just have to stop letting them control you."
        </p>
        <p className="text-xs text-muted-foreground mt-2">— Dan Harris</p>
      </div>
    </div>
  );
};

export default MentalHealthHome;
