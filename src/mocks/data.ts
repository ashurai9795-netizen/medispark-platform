// Mock data for patients
export const patients = [
  { id: "P001", name: "Sarah Johnson", age: 34, gender: "Female", phone: "555-0101", email: "sarah@email.com", bloodGroup: "A+", address: "123 Oak St", lastVisit: "2026-03-28", status: "active" },
  { id: "P002", name: "Michael Chen", age: 52, gender: "Male", phone: "555-0102", email: "mchen@email.com", bloodGroup: "O-", address: "456 Pine Ave", lastVisit: "2026-03-25", status: "active" },
  { id: "P003", name: "Emma Williams", age: 28, gender: "Female", phone: "555-0103", email: "emma.w@email.com", bloodGroup: "B+", address: "789 Elm Blvd", lastVisit: "2026-03-20", status: "active" },
  { id: "P004", name: "James Rodriguez", age: 45, gender: "Male", phone: "555-0104", email: "jrod@email.com", bloodGroup: "AB+", address: "321 Maple Dr", lastVisit: "2026-03-15", status: "inactive" },
  { id: "P005", name: "Aisha Patel", age: 61, gender: "Female", phone: "555-0105", email: "apatel@email.com", bloodGroup: "O+", address: "654 Cedar Ln", lastVisit: "2026-03-30", status: "active" },
  { id: "P006", name: "David Kim", age: 39, gender: "Male", phone: "555-0106", email: "dkim@email.com", bloodGroup: "A-", address: "987 Birch Rd", lastVisit: "2026-03-22", status: "active" },
];

export const doctors = [
  { id: "D001", name: "Dr. Robert Smith", specialization: "Cardiology", phone: "555-0201", email: "rsmith@hospital.com", experience: 15, status: "available", avatar: "", schedule: "Mon-Fri, 9AM-5PM" },
  { id: "D002", name: "Dr. Lisa Wang", specialization: "Neurology", phone: "555-0202", email: "lwang@hospital.com", experience: 12, status: "available", avatar: "", schedule: "Mon-Sat, 8AM-4PM" },
  { id: "D003", name: "Dr. Ahmed Hassan", specialization: "Orthopedics", phone: "555-0203", email: "ahassan@hospital.com", experience: 20, status: "on-leave", avatar: "", schedule: "Tue-Sat, 10AM-6PM" },
  { id: "D004", name: "Dr. Maria Garcia", specialization: "Pediatrics", phone: "555-0204", email: "mgarcia@hospital.com", experience: 8, status: "available", avatar: "", schedule: "Mon-Fri, 8AM-3PM" },
  { id: "D005", name: "Dr. John Adams", specialization: "Dermatology", phone: "555-0205", email: "jadams@hospital.com", experience: 10, status: "available", avatar: "", schedule: "Mon-Thu, 9AM-5PM" },
];

export const appointments = [
  { id: "A001", patientId: "P001", patientName: "Sarah Johnson", doctorId: "D001", doctorName: "Dr. Robert Smith", date: "2026-03-31", time: "09:00", type: "Check-up", status: "confirmed" },
  { id: "A002", patientId: "P002", patientName: "Michael Chen", doctorId: "D002", doctorName: "Dr. Lisa Wang", date: "2026-03-31", time: "10:30", type: "Follow-up", status: "confirmed" },
  { id: "A003", patientId: "P003", patientName: "Emma Williams", doctorId: "D004", doctorName: "Dr. Maria Garcia", date: "2026-03-31", time: "11:00", type: "Consultation", status: "pending" },
  { id: "A004", patientId: "P005", patientName: "Aisha Patel", doctorId: "D001", doctorName: "Dr. Robert Smith", date: "2026-04-01", time: "14:00", type: "Check-up", status: "confirmed" },
  { id: "A005", patientId: "P006", patientName: "David Kim", doctorId: "D003", doctorName: "Dr. Ahmed Hassan", date: "2026-04-01", time: "09:30", type: "Surgery Prep", status: "pending" },
  { id: "A006", patientId: "P004", patientName: "James Rodriguez", doctorId: "D005", doctorName: "Dr. John Adams", date: "2026-04-02", time: "15:00", type: "Follow-up", status: "cancelled" },
];

export const dashboardStats = {
  totalPatients: 1284,
  totalDoctors: 45,
  todayAppointments: 38,
  revenue: 52400,
  patientGrowth: 12.5,
  appointmentGrowth: 8.2,
};
