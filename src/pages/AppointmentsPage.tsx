import { useState, useMemo, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useApi } from "@/hooks/useApi";
import { appointmentAPI } from "@/services/api";
import { Plus, Search, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { AppointmentFormModal } from "@/components/features/AppointmentFormModal";

const AppointmentsPage = () => {
  const apiFn = useMemo(() => () => appointmentAPI.getAll(), []);
  const { data: appointments, loading } = useApi(apiFn);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    if (!appointments) return [];
    return appointments.filter((a) => {
      const matchSearch = a.patientName.toLowerCase().includes(search.toLowerCase()) || a.doctorName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || a.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [appointments, search, statusFilter]);

  return (
    <MainLayout title="Appointments">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search appointments..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex rounded-lg border border-input overflow-hidden">
            {["all", "confirmed", "pending", "cancelled"].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 text-xs font-medium capitalize transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-secondary"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Book Appointment
        </button>
      </div>

      {loading ? (
        <div className="glass-card"><div className="p-6 space-y-3">{[1,2,3,4].map((i) => <div key={i} className="h-16 bg-muted rounded animate-pulse" />)}</div></div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Patient</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Doctor</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Date & Time</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((appt, i) => (
                <motion.tr key={appt.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">{appt.patientName.charAt(0)}</div>
                      <span className="text-sm font-medium text-foreground">{appt.patientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{appt.doctorName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-sm text-foreground">
                      <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="w-3.5 h-3.5" />{appt.date}</span>
                      <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3.5 h-3.5" />{appt.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{appt.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      appt.status === "confirmed" ? "bg-success/10 text-success" :
                      appt.status === "pending" ? "bg-warning/10 text-warning" :
                      "bg-destructive/10 text-destructive"
                    }`}>{appt.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="p-12 text-center text-muted-foreground text-sm">No appointments found</div>}
        </motion.div>
      )}

      {showForm && <AppointmentFormModal onClose={() => setShowForm(false)} />}
    </MainLayout>
  );
};

export default AppointmentsPage;
