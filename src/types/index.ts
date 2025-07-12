

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'pending';
  department: string;
  subjects: string[];
  qualifications: Qualification[];
  schedules: Schedule[];
  salary: number;
  avatar?: string;
  address: Address;
  emergencyContact: EmergencyContact;
  performance: PerformanceMetrics;
  createdAt: string;
  updatedAt: string;
}

export interface Qualification {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  graduationYear: number;
  grade?: string;
  certificateUrl?: string;
  isVerified: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface Schedule {
  id: string;
  teacherId: string;
  classId: string;
  subjectId: string;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  room: string;
  semester: string;
  academicYear: string;
  isActive: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface PerformanceMetrics {
  teachingRating: number;
  studentSatisfaction: number;
  attendanceRate: number;
  completionRate: number;
  lastEvaluationDate: string;
  nextEvaluationDate: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  department: string;
  isActive: boolean;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  capacity: number;
  currentEnrollment: number;
  teacherId?: string;
  subjects: string[];
  schedule: Schedule[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headTeacherId?: string;
  description: string;
  budget: number;
  teacherCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  userId: string;
}

export interface DashboardStats {
  totalTeachers: number;
  activeTeachers: number;
  pendingQualifications: number;
  totalSchedules: number;
  activeSchedules: number;
  budgetUtilization: number;
  averagePerformance: number;
  recentHires: number;
}

export interface SearchFilters {
  department?: string;
  status?: 'active' | 'inactive' | 'pending';
  qualification?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  performance?: {
    min: number;
    max: number;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date' | 'file';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'teacher' | 'viewer';
  permissions: string[];
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    department?: string;
  };
  lastLogin: string;
  isActive: boolean;
}

// Chart and Analytics Part
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface AnalyticsData {
  teacherPerformance: ChartData;
  departmentStats: ChartData;
  qualificationStatus: ChartData;
  scheduleUtilization: ChartData;
  budgetTrends: ChartData;
}

// Form Part
export interface TeacherFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  department: string;
  subjects: string[];
  salary: number;
  address: Address;
  emergencyContact: EmergencyContact;
}

export interface QualificationFormData {
  degree: string;
  institution: string;
  fieldOfStudy: string;
  graduationYear: number;
  grade?: string;
  certificateFile?: File;
}

export interface ScheduleFormData {
  teacherId: string;
  classId: string;
  subjectId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
  semester: string;
  academicYear: string;
} 