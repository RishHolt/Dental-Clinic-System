export interface Appointment {
  id: string;
  time: string;
  patientName: string;
  patientId: string;
  procedure: string;
  dentist: string;
  operatory: string;
  status: "In Progress" | "Confirmed" | "Completed" | "Pending";
  duration: string;
}

export interface WaitlistPatient {
  queueNo: string;
  patientName: string;
  patientId: string;
  type: "Scheduled" | "Walk-In";
  arrivedAt: string;
  estimatedWait: string;
  dentist: string;
  procedure: string;
  status: "In Chair" | "Waiting" | "Completed" | "Cancelled";
}

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male";
  phone: string;
  lastVisit: string;
  nextVisit: string;
  medicalAlert: string;
  balance: number;
  status: "Active" | "New";
}

export interface DentalService {
  code: string;
  name: string;
  category: "Preventive" | "Restorative" | "Endodontics" | "Orthodontics" | "Surgery" | "Prosthodontics";
  price: number;
  durationMinutes: number;
}

export interface ClinicSupply {
  code: string;
  name: string;
  category: string;
  inStock: number;
  reorderLevel: number;
  unit: string;
  unitCost: number;
}

export interface ExpenseRecord {
  id: string;
  date: string;
  category: "Dental Supplies" | "Lab Fees" | "Equipment & Maintenance" | "Utilities & Rent" | "Staff & Admin";
  description: string;
  payee: string;
  amount: number;
  status: "Paid" | "Pending";
}

export const CLINIC_STATS = {
  todayAppointments: 16,
  patientsWaiting: 4,
  patientsInChair: 2,
  todayRevenue: 38400,
  activePatientsTotal: 1248,
  monthlyExpenses: 84200,
};

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-101",
    time: "09:00 AM",
    patientName: "Maria Clara Reyes",
    patientId: "PT-0101",
    procedure: "Dental Prophylaxis (Cleaning)",
    dentist: "Dr. Santos",
    operatory: "Chair 1",
    status: "Completed",
    duration: "45 mins",
  },
  {
    id: "APT-102",
    time: "10:00 AM",
    patientName: "Juan Paolo Gomez",
    patientId: "PT-0102",
    procedure: "Composite Resin Restoration",
    dentist: "Dr. Lim",
    operatory: "Chair 2",
    status: "In Progress",
    duration: "60 mins",
  },
  {
    id: "APT-103",
    time: "11:15 AM",
    patientName: "Sophia Angela Tan",
    patientId: "PT-0103",
    procedure: "Orthodontic Adjustment",
    dentist: "Dr. Santos",
    operatory: "Chair 1",
    status: "In Progress",
    duration: "30 mins",
  },
  {
    id: "APT-104",
    time: "01:00 PM",
    patientName: "Carlos Miguel Mendoza",
    patientId: "PT-0104",
    procedure: "Root Canal Therapy (Session 1)",
    dentist: "Dr. Santos",
    operatory: "Chair 1",
    status: "Confirmed",
    duration: "90 mins",
  },
  {
    id: "APT-105",
    time: "02:30 PM",
    patientName: "Bea Patricia Cruz",
    patientId: "PT-0105",
    procedure: "Porcelain Crown Fitting",
    dentist: "Dr. Lim",
    operatory: "Chair 2",
    status: "Confirmed",
    duration: "45 mins",
  },
  {
    id: "APT-106",
    time: "03:30 PM",
    patientName: "Rafael Gabriel Ramos",
    patientId: "PT-0106",
    procedure: "Simple Tooth Extraction",
    dentist: "Dr. Lim",
    operatory: "Chair 2",
    status: "Confirmed",
    duration: "45 mins",
  },
  {
    id: "APT-107",
    time: "04:30 PM",
    patientName: "Elena Kristina Perez",
    patientId: "PT-0107",
    procedure: "Initial Dental Consultation",
    dentist: "Dr. Santos",
    operatory: "Chair 1",
    status: "Pending",
    duration: "30 mins",
  },
];

export const MOCK_WAITLIST: WaitlistPatient[] = [
  {
    queueNo: "#01",
    patientName: "Sophia Angela Tan",
    patientId: "PT-0103",
    type: "Scheduled",
    arrivedAt: "11:05 AM",
    estimatedWait: "0 mins",
    dentist: "Dr. Santos",
    procedure: "Orthodontic Adjustment",
    status: "In Chair",
  },
  {
    queueNo: "#02",
    patientName: "Juan Paolo Gomez",
    patientId: "PT-0102",
    type: "Scheduled",
    arrivedAt: "09:50 AM",
    estimatedWait: "0 mins",
    dentist: "Dr. Lim",
    procedure: "Composite Resin Restoration",
    status: "In Chair",
  },
  {
    queueNo: "#03",
    patientName: "David Joshua Sy",
    patientId: "PT-0108",
    type: "Walk-In",
    arrivedAt: "11:20 AM",
    estimatedWait: "15 mins",
    dentist: "Dr. Lim",
    procedure: "Toothache Emergency Exam",
    status: "Waiting",
  },
  {
    queueNo: "#04",
    patientName: "Camilla Rose Garcia",
    patientId: "PT-0109",
    type: "Walk-In",
    arrivedAt: "11:35 AM",
    estimatedWait: "30 mins",
    dentist: "Dr. Santos",
    procedure: "Scaling & Polishing",
    status: "Waiting",
  },
  {
    queueNo: "#05",
    patientName: "Carlos Miguel Mendoza",
    patientId: "PT-0104",
    type: "Scheduled",
    arrivedAt: "12:45 PM",
    estimatedWait: "45 mins",
    dentist: "Dr. Santos",
    procedure: "Root Canal Therapy",
    status: "Waiting",
  },
  {
    queueNo: "#06",
    patientName: "Maria Clara Reyes",
    patientId: "PT-0101",
    type: "Scheduled",
    arrivedAt: "08:50 AM",
    estimatedWait: "0 mins",
    dentist: "Dr. Santos",
    procedure: "Dental Prophylaxis",
    status: "Completed",
  },
];

export const MOCK_PATIENTS: PatientRecord[] = [
  {
    id: "PT-0101",
    name: "Maria Clara Reyes",
    age: 28,
    gender: "Female",
    phone: "+63 917 123 4567",
    lastVisit: "Today",
    nextVisit: "Sep 28, 2026",
    medicalAlert: "None",
    balance: 0,
    status: "Active",
  },
  {
    id: "PT-0102",
    name: "Juan Paolo Gomez",
    age: 35,
    gender: "Male",
    phone: "+63 918 234 5678",
    lastVisit: "Today",
    nextVisit: "Oct 12, 2026",
    medicalAlert: "Penicillin Allergy",
    balance: 2500,
    status: "Active",
  },
  {
    id: "PT-0103",
    name: "Sophia Angela Tan",
    age: 22,
    gender: "Female",
    phone: "+63 920 345 6789",
    lastVisit: "Today",
    nextVisit: "Oct 14, 2026",
    medicalAlert: "None",
    balance: 0,
    status: "Active",
  },
  {
    id: "PT-0104",
    name: "Carlos Miguel Mendoza",
    age: 44,
    gender: "Male",
    phone: "+63 922 456 7890",
    lastVisit: "Sep 02, 2026",
    nextVisit: "Today",
    medicalAlert: "Hypertension (Stage 1)",
    balance: 4000,
    status: "Active",
  },
  {
    id: "PT-0105",
    name: "Bea Patricia Cruz",
    age: 31,
    gender: "Female",
    phone: "+63 905 567 8901",
    lastVisit: "Aug 20, 2026",
    nextVisit: "Today",
    medicalAlert: "None",
    balance: 0,
    status: "Active",
  },
  {
    id: "PT-0106",
    name: "Rafael Gabriel Ramos",
    age: 52,
    gender: "Male",
    phone: "+63 917 678 9012",
    lastVisit: "Jul 15, 2026",
    nextVisit: "Today",
    medicalAlert: "Diabetic (Type 2)",
    balance: 1200,
    status: "Active",
  },
  {
    id: "PT-0107",
    name: "Elena Kristina Perez",
    age: 26,
    gender: "Female",
    phone: "+63 928 789 0123",
    lastVisit: "First Visit",
    nextVisit: "Today",
    medicalAlert: "Latex Sensitivity",
    balance: 0,
    status: "New",
  },
];

export const MOCK_SERVICES: DentalService[] = [
  {
    code: "PRV-01",
    name: "Comprehensive Oral Exam & Charting",
    category: "Preventive",
    price: 800,
    durationMinutes: 30,
  },
  {
    code: "PRV-02",
    name: "Dental Prophylaxis (Scaling & Polishing)",
    category: "Preventive",
    price: 1500,
    durationMinutes: 45,
  },
  {
    code: "RST-01",
    name: "Composite Light-Cure Filling (1 Surface)",
    category: "Restorative",
    price: 1800,
    durationMinutes: 45,
  },
  {
    code: "RST-02",
    name: "Composite Light-Cure Filling (Multi-Surface)",
    category: "Restorative",
    price: 2600,
    durationMinutes: 60,
  },
  {
    code: "END-01",
    name: "Anterior Root Canal Therapy",
    category: "Endodontics",
    price: 7500,
    durationMinutes: 90,
  },
  {
    code: "END-02",
    name: "Molar Root Canal Therapy",
    category: "Endodontics",
    price: 12000,
    durationMinutes: 120,
  },
  {
    code: "SRG-01",
    name: "Simple Tooth Extraction",
    category: "Surgery",
    price: 1200,
    durationMinutes: 40,
  },
  {
    code: "SRG-02",
    name: "Surgical Odontectomy (Impacted Molar)",
    category: "Surgery",
    price: 9000,
    durationMinutes: 90,
  },
  {
    code: "ORT-01",
    name: "Orthodontic Braces Package",
    category: "Orthodontics",
    price: 45000,
    durationMinutes: 60,
  },
  {
    code: "PRO-01",
    name: "Zirconia All-Ceramic Crown",
    category: "Prosthodontics",
    price: 14000,
    durationMinutes: 60,
  },
];

export const MOCK_SUPPLIES: ClinicSupply[] = [
  {
    code: "MAT-001",
    name: "Filtek Z250 Universal Restorative A2",
    category: "Restorative Composite",
    inStock: 18,
    reorderLevel: 5,
    unit: "Syringe 4g",
    unitCost: 1650,
  },
  {
    code: "MAT-002",
    name: "Single Bond Universal Adhesive 5ml",
    category: "Bonding Agents",
    inStock: 6,
    reorderLevel: 2,
    unit: "Bottle",
    unitCost: 2800,
  },
  {
    code: "MAT-003",
    name: "Lidocaine HCl 2% with Epinephrine",
    category: "Local Anesthesia",
    inStock: 120,
    reorderLevel: 30,
    unit: "Carpules",
    unitCost: 45,
  },
  {
    code: "MAT-004",
    name: "Alginate Impression Powder Fast Set",
    category: "Impression Materials",
    inStock: 12,
    reorderLevel: 4,
    unit: "Pouch 454g",
    unitCost: 420,
  },
  {
    code: "MAT-005",
    name: "Sterilization Pouches 3.5\" x 9\"",
    category: "Infection Control",
    inStock: 450,
    reorderLevel: 100,
    unit: "Pieces",
    unitCost: 8,
  },
];

export const MOCK_EXPENSES: ExpenseRecord[] = [
  {
    id: "EXP-2026-081",
    date: "Sep 12, 2026",
    category: "Dental Supplies",
    description: "Monthly Restorative Composite & Bonding Kit replenishment",
    payee: "DentMed Supplies Inc.",
    amount: 18450,
    status: "Paid",
  },
  {
    id: "EXP-2026-082",
    date: "Sep 10, 2026",
    category: "Lab Fees",
    description: "Zirconia Crown fabrication (Batch #09)",
    payee: "Aesthetic Dental Prosthetics Lab",
    amount: 24000,
    status: "Paid",
  },
  {
    id: "EXP-2026-083",
    date: "Sep 08, 2026",
    category: "Equipment & Maintenance",
    description: "Autoclave Sterilizer quarterly maintenance & calibration",
    payee: "BioMedical EquipTech Services",
    amount: 5500,
    status: "Paid",
  },
  {
    id: "EXP-2026-084",
    date: "Sep 05, 2026",
    category: "Dental Supplies",
    description: "Nitrile gloves, surgical masks & infection barrier films",
    payee: "SafeCare PPE Distributors",
    amount: 7850,
    status: "Paid",
  },
  {
    id: "EXP-2026-085",
    date: "Sep 03, 2026",
    category: "Utilities & Rent",
    description: "Clinic Space Electric & Compressor Power (August)",
    payee: "Meralco Commercial",
    amount: 14200,
    status: "Paid",
  },
  {
    id: "EXP-2026-086",
    date: "Sep 01, 2026",
    category: "Staff & Admin",
    description: "Clinical waste disposal & biohazard handling fee",
    payee: "CleanBio Environmental Corp",
    amount: 4200,
    status: "Pending",
  },
];
