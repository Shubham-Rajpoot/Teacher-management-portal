'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Award,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Bell,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DashboardStats, Teacher, Notification } from '@/types';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTeachers: 156,
    activeTeachers: 142,
    pendingQualifications: 23,
    totalSchedules: 89,
    activeSchedules: 87,
    budgetUtilization: 78,
    averagePerformance: 4.2,
    recentHires: 8
  });

  const [recentTeachers, setRecentTeachers] = useState<Teacher[]>([
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@school.edu',
      phone: '+1-555-0123',
      dateOfBirth: '1985-03-15',
      hireDate: '2024-01-15',
      status: 'active',
      department: 'Mathematics',
      subjects: ['Algebra', 'Calculus'],
      qualifications: [],
      schedules: [],
      salary: 65000,
      address: { street: '123 Main St', city: 'Springfield', state: 'IL', zipCode: '62701', country: 'USA' },
      emergencyContact: { name: 'John Johnson', relationship: 'Spouse', phone: '+1-555-0124' },
      performance: { teachingRating: 4.5, studentSatisfaction: 4.3, attendanceRate: 95, completionRate: 98, lastEvaluationDate: '2024-01-15', nextEvaluationDate: '2024-07-15' },
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@school.edu',
      phone: '+1-555-0125',
      dateOfBirth: '1988-07-22',
      hireDate: '2024-02-01',
      status: 'active',
      department: 'Science',
      subjects: ['Physics', 'Chemistry'],
      qualifications: [],
      schedules: [],
      salary: 62000,
      address: { street: '456 Oak Ave', city: 'Springfield', state: 'IL', zipCode: '62702', country: 'USA' },
      emergencyContact: { name: 'Lisa Chen', relationship: 'Spouse', phone: '+1-555-0126' },
      performance: { teachingRating: 4.7, studentSatisfaction: 4.6, attendanceRate: 98, completionRate: 99, lastEvaluationDate: '2024-02-01', nextEvaluationDate: '2024-08-01' },
      createdAt: '2024-02-01',
      updatedAt: '2024-02-01'
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Teacher Application',
      message: 'Sarah Johnson has submitted her qualification documents for review.',
      type: 'info',
      isRead: false,
      createdAt: '2024-01-20T10:30:00Z',
      userId: 'admin'
    },
    {
      id: '2',
      title: 'Performance Review Due',
      message: 'Michael Chen\'s performance review is scheduled for next week.',
      type: 'warning',
      isRead: false,
      createdAt: '2024-01-19T14:15:00Z',
      userId: 'admin'
    }
  ]);

  const performanceData = [
    { month: 'Jan', rating: 4.2, satisfaction: 4.1 },
    { month: 'Feb', rating: 4.3, satisfaction: 4.2 },
    { month: 'Mar', rating: 4.4, satisfaction: 4.3 },
    { month: 'Apr', rating: 4.5, satisfaction: 4.4 },
    { month: 'May', rating: 4.6, satisfaction: 4.5 },
    { month: 'Jun', rating: 4.7, satisfaction: 4.6 }
  ];

  const departmentData = [
    { name: 'Mathematics', teachers: 25, budget: 450000 },
    { name: 'Science', teachers: 22, budget: 420000 },
    { name: 'English', teachers: 18, budget: 380000 },
    { name: 'History', teachers: 15, budget: 320000 },
    { name: 'Arts', teachers: 12, budget: 280000 }
  ];

  const qualificationStatusData = [
    { name: 'Verified', value: 133, color: '#10B981' },
    { name: 'Pending', value: 23, color: '#F59E0B' },
    { name: 'Expired', value: 5, color: '#EF4444' }
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Management Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your teachers today.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search teachers..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Teacher
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Teachers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalTeachers}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                +12% from last month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Schedules</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeSchedules}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <CheckCircle className="w-4 h-4" />
                {stats.activeSchedules}/{stats.totalSchedules} active
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Qualifications</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingQualifications}</p>
              <p className="text-sm text-yellow-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4" />
                Requires attention
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <GraduationCap className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Utilization</p>
              <p className="text-3xl font-bold text-gray-900">{stats.budgetUtilization}%</p>
              <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                <DollarSign className="w-4 h-4" />
                On track
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[3.5, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="rating" stroke="#3B82F6" strokeWidth={2} name="Teaching Rating" />
              <Line type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={2} name="Student Satisfaction" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="teachers" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualification Status</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={qualificationStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {qualificationStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-4">
            {qualificationStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="font-medium text-gray-700">{item.name}</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Teachers</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-4">
            {recentTeachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {teacher.firstName[0]}{teacher.lastName[0]}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{teacher.firstName} {teacher.lastName}</h4>
                  <p className="text-sm text-gray-600">{teacher.department}</p>
                  <p className="text-xs text-gray-500">Hired {new Date(teacher.hireDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">Mark All Read</button>
          </div>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 rounded-lg border-l-4 ${
                notification.type === 'info' ? 'border-blue-500 bg-blue-50' :
                notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                notification.type === 'success' ? 'border-green-500 bg-green-50' :
                'border-red-500 bg-red-50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`p-1 rounded-full ${
                    notification.type === 'info' ? 'bg-blue-100' :
                    notification.type === 'warning' ? 'bg-yellow-100' :
                    notification.type === 'success' ? 'bg-green-100' :
                    'bg-red-100'
                  }`}>
                    {notification.type === 'info' && <Bell className="w-4 h-4 text-blue-600" />}
                    {notification.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                    {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {notification.type === 'error' && <XCircle className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Plus className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Add Teacher</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Calendar className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Create Schedule</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Review Qualifications</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
            <Award className="w-6 h-6 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Performance Review</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
            <Download className="w-6 h-6 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Export Data</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <Filter className="w-6 h-6 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Advanced Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
