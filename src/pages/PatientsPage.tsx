import { useState, useMemo, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useApi } from "@/hooks/useApi";
import { patientAPI } from "@/services/api";
import { Plus, Search, MoreHorizontal, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { PatientFormModal } from "@/components/features/PatientFormModal";

const PatientsPage = () => {
  const apiFn = useMemo(() => () => patientAPI.getAll(), []);
  const { data: patients, loading } = useApi(apiFn);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    if (!patients) return [];
    return patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));
  }, [patients, search]);

  const handleAdd = useCallback(() => setShowForm(true), []);

  return (
    <MainLayout title="Patients">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Patient
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="glass-card p-6 h-44 animate-pulse"><div className="h-4 bg-muted rounded w-1/2 mb-3" /><div className="h-3 bg-muted rounded w-1/3" /></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((patient, i) => (
            <motion.div key={patient.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card-hover p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm">
                    {patient.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.id} · {patient.bloodGroup}</p>
                  </div>
                </div>
                <button className="p-1 rounded hover:bg-secondary transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><span className="font-medium text-foreground/80">{patient.age}y</span> · {patient.gender}</div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {patient.phone}</div>
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {patient.email}</div>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${patient.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                  {patient.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showForm && <PatientFormModal onClose={() => setShowForm(false)} />}
    </MainLayout>
  );
};

export default PatientsPage;
