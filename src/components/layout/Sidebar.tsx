import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarCheck,
  LogOut,
  Activity,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/appointments", label: "Appointments", icon: CalendarCheck },
];

export const Sidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col" style={{ background: "hsl(var(--sidebar-bg))" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-heading text-base font-bold" style={{ color: "hsl(0 0% 100%)" }}>MedCore</h1>
          <p className="text-xs" style={{ color: "hsl(var(--sidebar-fg) / 0.6)" }}>Hospital Management</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/15 text-primary"
                  : ""
              }`}
              style={!active ? { color: "hsl(var(--sidebar-fg))" } : undefined}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "hsl(var(--sidebar-hover))"; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = ""; }}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: "hsl(0 0% 100%)" }}>{user?.name}</p>
            <p className="text-xs truncate capitalize" style={{ color: "hsl(var(--sidebar-fg) / 0.6)" }}>{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors"
          style={{ color: "hsl(var(--sidebar-fg))" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(var(--sidebar-hover))"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
