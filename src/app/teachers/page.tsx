'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Teacher } from '@/types';

const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
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
      subjects: ['Algebra', 'Calculus', 'Statistics'],
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
    },
    {
      id: '3',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@school.edu',
      phone: '+1-555-0127',
      dateOfBirth: '1990-11-08',
      hireDate: '2023-09-01',
      status: 'active',
      department: 'English',
      subjects: ['Literature', 'Composition', 'Creative Writing'],
      qualifications: [],
      schedules: [],
      salary: 58000,
      address: { street: '789 Pine St', city: 'Springfield', state: 'IL', zipCode: '62703', country: 'USA' },
      emergencyContact: { name: 'Robert Davis', relationship: 'Spouse', phone: '+1-555-0128' },
      performance: { teachingRating: 4.3, studentSatisfaction: 4.4, attendanceRate: 92, completionRate: 95, lastEvaluationDate: '2023-12-01', nextEvaluationDate: '2024-06-01' },
      createdAt: '2023-09-01',
      updatedAt: '2023-09-01'
    },
    {
      id: '4',
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@school.edu',
      phone: '+1-555-0129',
      dateOfBirth: '1982-05-14',
      hireDate: '2022-08-15',
      status: 'inactive',
      department: 'History',
      subjects: ['World History', 'American History'],
      qualifications: [],
      schedules: [],
      salary: 55000,
      address: { street: '321 Elm St', city: 'Springfield', state: 'IL', zipCode: '62704', country: 'USA' },
      emergencyContact: { name: 'Mary Wilson', relationship: 'Spouse', phone: '+1-555-0130' },
      performance: { teachingRating: 3.8, studentSatisfaction: 3.9, attendanceRate: 85, completionRate: 88, lastEvaluationDate: '2023-11-15', nextEvaluationDate: '2024-05-15' },
      createdAt: '2022-08-15',
      updatedAt: '2022-08-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const departments = ['Mathematics', 'Science', 'English', 'History', 'Arts', 'Physical Education'];
  const statuses = ['active', 'inactive', 'pending'];

  const filteredTeachers = teachers
    .filter(teacher => {
      const matchesSearch = 
        teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
      const matchesDepartment = departmentFilter === 'all' || teacher.department === departmentFilter;
      
      return matchesSearch && matchesStatus && matchesDepartment;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
          break;
        case 'department':
          aValue = a.department;
          bValue = b.department;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'performance':
          aValue = a.performance.teachingRating;
          bValue = b.performance.teachingRating;
          break;
        case 'hireDate':
          aValue = new Date(a.hireDate);
          bValue = new Date(b.hireDate);
          break;
        default:
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-600 mt-1">Manage your teaching staff and their information</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Teacher
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order as 'asc' | 'desc');
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="department-asc">Department (A-Z)</option>
            <option value="department-desc">Department (Z-A)</option>
            <option value="performance-desc">Performance (High-Low)</option>
            <option value="performance-asc">Performance (Low-High)</option>
            <option value="hireDate-desc">Hire Date (Newest)</option>
            <option value="hireDate-asc">Hire Date (Oldest)</option>
          </select>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-xl p-6 shadow-lg card-hover">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {teacher.firstName[0]}{teacher.lastName[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{teacher.firstName} {teacher.lastName}</h3>
                  <p className="text-sm text-gray-600">{teacher.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(teacher.status)}`}>
                  {getStatusIcon(teacher.status)}
                  {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                </span>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {teacher.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {teacher.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {teacher.address.city}, {teacher.address.state}
              </div>
            </div>

            {/* Performance */}
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Performance</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{teacher.performance.teachingRating}</div>
                <div className="text-xs text-gray-500">/ 5.0</div>
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Subjects</h4>
              <div className="flex flex-wrap gap-1">
                {teacher.subjects.slice(0, 3).map((subject, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {subject}
                  </span>
                ))}
                {teacher.subjects.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{teacher.subjects.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                Hired {new Date(teacher.hireDate).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
          <button className="btn-primary">Add New Teacher</button>
        </div>
      )}

      {/* Results Summary */}
      {filteredTeachers.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600">
            Showing {filteredTeachers.length} of {teachers.length} teachers
          </p>
        </div>
      )}
    </div>
  );
};

export default TeachersPage; 