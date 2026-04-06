import { Link, useLocation, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", emoji: "🏠", label: "Home" },
  { to: "/chat", emoji: "💬", label: "Chat" },
  { to: "/mood", emoji: "🎭", label: "Mood" },
  { to: "/journal", emoji: "📔", label: "Journal" },
  { to: "/breathing", emoji: "🌬️", label: "Breathe" },
];

const MentalHealthLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top nav */}
      <nav className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-primary">🧠 MindSpace</Link>
        <div className="hidden sm:flex gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                pathname === item.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {item.emoji} {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around py-2 z-50">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] transition-colors ${
              pathname === item.to ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <span className="text-lg">{item.emoji}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MentalHealthLayout;
