import { patients, doctors, appointments, dashboardStats } from "@/mocks/data";

// Simulate async API calls with delay
const delay = (ms: number = 300) => new Promise((res) => setTimeout(res, ms));

export const patientAPI = {
  getAll: async () => { await delay(); return [...patients]; },
  getById: async (id: string) => { await delay(); return patients.find((p) => p.id === id) || null; },
  create: async (data: Omit<typeof patients[0], "id">) => { await delay(); return { ...data, id: `P${String(patients.length + 1).padStart(3, "0")}` }; },
  update: async (id: string, data: Partial<typeof patients[0]>) => { await delay(); const p = patients.find((p) => p.id === id); return p ? { ...p, ...data } : null; },
  delete: async (id: string) => { await delay(); return { success: true, id }; },
};

export const doctorAPI = {
  getAll: async () => { await delay(); return [...doctors]; },
  getById: async (id: string) => { await delay(); return doctors.find((d) => d.id === id) || null; },
  create: async (data: Omit<typeof doctors[0], "id">) => { await delay(); return { ...data, id: `D${String(doctors.length + 1).padStart(3, "0")}` }; },
  update: async (id: string, data: Partial<typeof doctors[0]>) => { await delay(); const d = doctors.find((d) => d.id === id); return d ? { ...d, ...data } : null; },
  delete: async (id: string) => { await delay(); return { success: true, id }; },
};

export const appointmentAPI = {
  getAll: async () => { await delay(); return [...appointments]; },
  getById: async (id: string) => { await delay(); return appointments.find((a) => a.id === id) || null; },
  create: async (data: Omit<typeof appointments[0], "id">) => { await delay(); return { ...data, id: `A${String(appointments.length + 1).padStart(3, "0")}` }; },
  update: async (id: string, data: Partial<typeof appointments[0]>) => { await delay(); const a = appointments.find((a) => a.id === id); return a ? { ...a, ...data } : null; },
  delete: async (id: string) => { await delay(); return { success: true, id }; },
};

export const dashboardAPI = {
  getStats: async () => { await delay(); return { ...dashboardStats }; },
};
