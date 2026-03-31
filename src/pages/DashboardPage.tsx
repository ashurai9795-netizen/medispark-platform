import { useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useApi } from "@/hooks/useApi";
import { dashboardAPI, appointmentAPI } from "@/services/api";
import { Users, Stethoscope, CalendarCheck, DollarSign, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";

const statIcons: Record<string, any> = {
  patients: Users,
  doctors: Stethoscope,
  appointments: CalendarCheck,
  revenue: DollarSign,
};

const statColors: Record<string, string> = {
  patients: "bg-primary/10 text-primary",
  doctors: "bg-accent/10 text-accent",
  appointments: "bg-warning/10 text-warning",
  revenue: "bg-success/10 text-success",
};

const DashboardPage = () => {
  const statsApi = useMemo(() => () => dashboardAPI.getStats(), []);
  const apptApi = useMemo(() => () => appointmentAPI.getAll(), []);
  const { data: stats, loading: statsLoading } = useApi(statsApi);
  const { data: appointments, loading: apptLoading } = useApi(apptApi);

  const statCards = stats
    ? [
        { key: "patients", label: "Total Patients", value: stats.totalPatients.toLocaleString(), growth: stats.patientGrowth },
        { key: "doctors", label: "Active Doctors", value: stats.totalDoctors, growth: null },
        { key: "appointments", label: "Today's Appointments", value: stats.todayAppointments, growth: stats.appointmentGrowth },
        { key: "revenue", label: "Monthly Revenue", value: `$${stats.revenue.toLocaleString()}`, growth: null },
      ]
    : [];

  const todayAppts = appointments?.filter((a) => a.date === "2026-03-31").slice(0, 5) || [];

  return (
    <MainLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-3" />
                <div className="h-8 bg-muted rounded w-1/3" />
              </div>
            ))
          : statCards.map((s, i) => {
              const Icon = statIcons[s.key];
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card-hover p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statColors[s.key]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
                  {s.growth !== null && (
                    <div className="flex items-center gap-1 mt-2 text-success text-xs font-medium">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{s.growth}% from last month
                    </div>
                  )}
                </motion.div>
              );
            })}
      </div>

      {/* Recent Appointments */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-foreground">Today's Appointments</h3>
          <span className="text-xs text-muted-foreground">March 31, 2026</span>
        </div>
        {apptLoading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-14 bg-muted rounded animate-pulse" />)}
          </div>
        ) : todayAppts.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground text-sm">No appointments today</div>
        ) : (
          <div className="divide-y divide-border">
            {todayAppts.map((appt) => (
              <div key={appt.id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {appt.patientName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{appt.patientName}</p>
                    <p className="text-xs text-muted-foreground">{appt.doctorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {appt.time}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    appt.status === "confirmed" ? "bg-success/10 text-success" :
                    appt.status === "pending" ? "bg-warning/10 text-warning" :
                    "bg-destructive/10 text-destructive"
                  }`}>{appt.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default DashboardPage;
