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
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileText,
  GraduationCap,
  Calendar,
  User,
  Building,
  Award,
  Star,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';
import { Qualification, Teacher } from '@/types';

interface QualificationWithTeacher extends Qualification {
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
  };
}

const QualificationsPage: React.FC = () => {
  const [qualifications, setQualifications] = useState<QualificationWithTeacher[]>([
    {
      id: '1',
      degree: 'Master of Education',
      institution: 'Harvard University',
      fieldOfStudy: 'Mathematics Education',
      graduationYear: 2020,
      grade: 'A+',
      certificateUrl: '/certificates/sarah-johnson-masters.pdf',
      isVerified: true,
      verifiedAt: '2024-01-15T10:30:00Z',
      verifiedBy: 'admin@school.edu',
      teacher: {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@school.edu',
        department: 'Mathematics'
      }
    },
    {
      id: '2',
      degree: 'PhD in Physics',
      institution: 'MIT',
      fieldOfStudy: 'Theoretical Physics',
      graduationYear: 2018,
      grade: 'A',
      certificateUrl: '/certificates/michael-chen-phd.pdf',
      isVerified: true,
      verifiedAt: '2024-02-01T14:15:00Z',
      verifiedBy: 'admin@school.edu',
      teacher: {
        id: '2',
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@school.edu',
        department: 'Science'
      }
    },
    {
      id: '3',
      degree: 'Bachelor of Arts',
      institution: 'Stanford University',
      fieldOfStudy: 'English Literature',
      graduationYear: 2019,
      grade: 'A-',
      certificateUrl: '/certificates/emily-davis-bachelors.pdf',
      isVerified: false,
      teacher: {
        id: '3',
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@school.edu',
        department: 'English'
      }
    },
    {
      id: '4',
      degree: 'Master of Arts',
      institution: 'Yale University',
      fieldOfStudy: 'History',
      graduationYear: 2017,
      grade: 'B+',
      certificateUrl: '/certificates/david-wilson-masters.pdf',
      isVerified: false,
      teacher: {
        id: '4',
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@school.edu',
        department: 'History'
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('teacherName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const departments = ['Mathematics', 'Science', 'English', 'History', 'Arts', 'Physical Education'];
  const statuses = ['verified', 'pending', 'expired'];

  const filteredQualifications = qualifications
    .filter(qualification => {
      const matchesSearch = 
        qualification.teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qualification.teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qualification.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qualification.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qualification.fieldOfStudy.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'verified' && qualification.isVerified) ||
        (statusFilter === 'pending' && !qualification.isVerified);
      const matchesDepartment = departmentFilter === 'all' || qualification.teacher.department === departmentFilter;
      
      return matchesSearch && matchesStatus && matchesDepartment;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'teacherName':
          aValue = `${a.teacher.firstName} ${a.teacher.lastName}`;
          bValue = `${b.teacher.firstName} ${b.teacher.lastName}`;
          break;
        case 'department':
          aValue = a.teacher.department;
          bValue = b.teacher.department;
          break;
        case 'degree':
          aValue = a.degree;
          bValue = b.degree;
          break;
        case 'institution':
          aValue = a.institution;
          bValue = b.institution;
          break;
        case 'graduationYear':
          aValue = a.graduationYear;
          bValue = b.graduationYear;
          break;
        case 'verificationStatus':
          aValue = a.isVerified;
          bValue = b.isVerified;
          break;
        default:
          aValue = `${a.teacher.firstName} ${a.teacher.lastName}`;
          bValue = `${b.teacher.firstName} ${b.teacher.lastName}`;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusColor = (isVerified: boolean) => {
    return isVerified 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getStatusIcon = (isVerified: boolean) => {
    return isVerified ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />;
  };

  const getStatusText = (isVerified: boolean) => {
    return isVerified ? 'Verified' : 'Pending Review';
  };

  const handleVerify = (qualificationId: string) => {
    setQualifications(prev => prev.map(q => 
      q.id === qualificationId 
        ? { ...q, isVerified: true, verifiedAt: new Date().toISOString(), verifiedBy: 'admin@school.edu' }
        : q
    ));
  };

  const handleReject = (qualificationId: string) => {
    setQualifications(prev => prev.map(q => 
      q.id === qualificationId 
        ? { ...q, isVerified: false, verifiedAt: undefined, verifiedBy: undefined }
        : q
    ));
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Qualifications</h1>
          <p className="text-gray-600 mt-1">Review and manage teacher qualifications and certifications</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Qualification
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Qualifications</p>
              <p className="text-3xl font-bold text-gray-900">{qualifications.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-3xl font-bold text-green-600">
                {qualifications.filter(q => q.isVerified).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">
                {qualifications.filter(q => !q.isVerified).length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              <p className="text-3xl font-bold text-purple-600">A-</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
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
              placeholder="Search qualifications..."
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
            <option value="verified">Verified</option>
            <option value="pending">Pending Review</option>
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
            <option value="teacherName-asc">Teacher Name (A-Z)</option>
            <option value="teacherName-desc">Teacher Name (Z-A)</option>
            <option value="department-asc">Department (A-Z)</option>
            <option value="degree-asc">Degree (A-Z)</option>
            <option value="institution-asc">Institution (A-Z)</option>
            <option value="graduationYear-desc">Graduation Year (Newest)</option>
            <option value="graduationYear-asc">Graduation Year (Oldest)</option>
            <option value="verificationStatus-desc">Status (Verified First)</option>
          </select>
        </div>
      </div>

      {/* Qualifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredQualifications.map((qualification) => (
          <div key={qualification.id} className="bg-white rounded-xl p-6 shadow-lg card-hover">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {qualification.teacher.firstName[0]}{qualification.teacher.lastName[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{qualification.teacher.firstName} {qualification.teacher.lastName}</h3>
                  <p className="text-sm text-gray-600">{qualification.teacher.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(qualification.isVerified)}`}>
                  {getStatusIcon(qualification.isVerified)}
                  {getStatusText(qualification.isVerified)}
                </span>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Qualification Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{qualification.degree}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{qualification.institution}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{qualification.fieldOfStudy}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Graduated {qualification.graduationYear}</span>
                {qualification.grade && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Grade: {qualification.grade}
                  </span>
                )}
              </div>
            </div>

            {/* Verification Info */}
            {qualification.isVerified && qualification.verifiedAt && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified on {new Date(qualification.verifiedAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-green-600 mt-1">by {qualification.verifiedBy}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                {qualification.certificateUrl && (
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                    <FileText className="w-4 h-4" />
                    View Certificate
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {!qualification.isVerified ? (
                  <>
                    <button 
                      onClick={() => handleVerify(qualification.id)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-sm font-medium"
                    >
                      Verify
                    </button>
                    <button 
                      onClick={() => handleReject(qualification.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleReject(qualification.id)}
                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 text-sm font-medium"
                  >
                    Revoke
                  </button>
                )}
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredQualifications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No qualifications found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
          <button className="btn-primary">Add New Qualification</button>
        </div>
      )}

      {/* Results Summary */}
      {filteredQualifications.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600">
            Showing {filteredQualifications.length} of {qualifications.length} qualifications
          </p>
        </div>
      )}
    </div>
  );
};

export default QualificationsPage; 