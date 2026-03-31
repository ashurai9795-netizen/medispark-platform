import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useApi } from "@/hooks/useApi";
import { doctorAPI } from "@/services/api";
import { Search, Plus, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";

const specColors: Record<string, string> = {
  Cardiology: "bg-destructive/10 text-destructive",
  Neurology: "bg-info/10 text-info",
  Orthopedics: "bg-warning/10 text-warning",
  Pediatrics: "bg-success/10 text-success",
  Dermatology: "bg-primary/10 text-primary",
};

const DoctorsPage = () => {
  const apiFn = useMemo(() => () => doctorAPI.getAll(), []);
  const { data: doctors, loading } = useApi(apiFn);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!doctors) return [];
    return doctors.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase()));
  }, [doctors, search]);

  return (
    <MainLayout title="Doctors">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search doctors..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1,2,3].map((i) => <div key={i} className="glass-card p-6 h-52 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((doc, i) => (
            <motion.div key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card-hover p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {doc.name.replace("Dr. ", "").split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${specColors[doc.specialization] || "bg-muted text-muted-foreground"}`}>
                    {doc.specialization}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${doc.status === "available" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                  {doc.status}
                </span>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Star className="w-3.5 h-3.5" /> {doc.experience} years experience</div>
                <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {doc.schedule}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default DoctorsPage;
