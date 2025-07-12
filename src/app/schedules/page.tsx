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
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { Schedule, Teacher, Subject, Class } from '@/types';

interface ScheduleWithDetails extends Schedule {
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
    department: string;
  };
  subject: {
    id: string;
    name: string;
    code: string;
  };
  class: {
    id: string;
    name: string;
    grade: string;
    section: string;
  };
}

const SchedulesPage: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleWithDetails[]>([
    {
      id: '1',
      teacherId: '1',
      classId: '1',
      subjectId: '1',
      dayOfWeek: 'monday',
      startTime: '08:00',
      endTime: '09:30',
      room: 'Room 101',
      semester: 'Fall 2024',
      academicYear: '2024-2025',
      isActive: true,
      teacher: {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        department: 'Mathematics'
      },
      subject: {
        id: '1',
        name: 'Algebra',
        code: 'MATH101'
      },
      class: {
        id: '1',
        name: 'Grade 9A',
        grade: '9',
        section: 'A'
      }
    },
    {
      id: '2',
      teacherId: '1',
      classId: '2',
      subjectId: '2',
      dayOfWeek: 'monday',
      startTime: '10:00',
      endTime: '11:30',
      room: 'Room 102',
      semester: 'Fall 2024',
      academicYear: '2024-2025',
      isActive: true,
      teacher: {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        department: 'Mathematics'
      },
      subject: {
        id: '2',
        name: 'Calculus',
        code: 'MATH201'
      },
      class: {
        id: '2',
        name: 'Grade 11B',
        grade: '11',
        section: 'B'
      }
    },
    {
      id: '3',
      teacherId: '2',
      classId: '3',
      subjectId: '3',
      dayOfWeek: 'tuesday',
      startTime: '09:00',
      endTime: '10:30',
      room: 'Lab 201',
      semester: 'Fall 2024',
      academicYear: '2024-2025',
      isActive: true,
      teacher: {
        id: '2',
        firstName: 'Michael',
        lastName: 'Chen',
        department: 'Science'
      },
      subject: {
        id: '3',
        name: 'Physics',
        code: 'SCI101'
      },
      class: {
        id: '3',
        name: 'Grade 10A',
        grade: '10',
        section: 'A'
      }
    },
    {
      id: '4',
      teacherId: '3',
      classId: '4',
      subjectId: '4',
      dayOfWeek: 'wednesday',
      startTime: '13:00',
      endTime: '14:30',
      room: 'Room 103',
      semester: 'Fall 2024',
      academicYear: '2024-2025',
      isActive: false,
      teacher: {
        id: '3',
        firstName: 'Emily',
        lastName: 'Davis',
        department: 'English'
      },
      subject: {
        id: '4',
        name: 'Literature',
        code: 'ENG101'
      },
      class: {
        id: '4',
        name: 'Grade 9B',
        grade: '9',
        section: 'B'
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dayFilter, setDayFilter] = useState<string>('all');
  const [teacherFilter, setTeacherFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const teachers = Array.from(new Set(schedules.map(s => s.teacher.id))).map(id => {
    const schedule = schedules.find(s => s.teacher.id === id);
    return { id, name: `${schedule?.teacher.firstName} ${schedule?.teacher.lastName}` };
  });

  const filteredSchedules = schedules
    .filter(schedule => {
      const matchesSearch = 
        schedule.teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.class.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.room.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDay = dayFilter === 'all' || schedule.dayOfWeek === dayFilter;
      const matchesTeacher = teacherFilter === 'all' || schedule.teacherId === teacherFilter;
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && schedule.isActive) ||
        (statusFilter === 'inactive' && !schedule.isActive);
      
      return matchesSearch && matchesDay && matchesTeacher && matchesStatus;
    });

  const getDayColor = (day: string) => {
    const colors = {
      monday: 'bg-blue-100 text-blue-800',
      tuesday: 'bg-purple-100 text-purple-800',
      wednesday: 'bg-green-100 text-green-800',
      thursday: 'bg-yellow-100 text-yellow-800',
      friday: 'bg-red-100 text-red-800',
      saturday: 'bg-gray-100 text-gray-800',
      sunday: 'bg-pink-100 text-pink-800'
    };
    return colors[day as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getSchedulesForDay = (day: string) => {
    return filteredSchedules.filter(schedule => schedule.dayOfWeek === day);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedules</h1>
          <p className="text-gray-600 mt-1">Manage teacher schedules and class timetables</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              List View
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Calendar View
            </button>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Schedule
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Schedules</p>
              <p className="text-3xl font-bold text-gray-900">{schedules.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Schedules</p>
              <p className="text-3xl font-bold text-green-600">
                {schedules.filter(s => s.isActive).length}
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
              <p className="text-sm font-medium text-gray-600">Teachers Scheduled</p>
              <p className="text-3xl font-bold text-purple-600">
                {new Set(schedules.map(s => s.teacherId)).size}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Classes Covered</p>
              <p className="text-3xl font-bold text-orange-600">
                {new Set(schedules.map(s => s.classId)).size}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-orange-600" />
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
              placeholder="Search schedules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Day Filter */}
          <select
            value={dayFilter}
            onChange={(e) => setDayFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Days</option>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </option>
            ))}
          </select>

          {/* Teacher Filter */}
          <select
            value={teacherFilter}
            onChange={(e) => setTeacherFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Teachers</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        /* List View */
        <div className="space-y-6">
          {daysOfWeek.map(day => {
            const daySchedules = getSchedulesForDay(day);
            if (daySchedules.length === 0) return null;

            return (
              <div key={day} className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">{day}</h3>
                  <p className="text-sm text-gray-600">{daySchedules.length} schedule(s)</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {daySchedules.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">
                              {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">
                              {schedule.teacher.firstName} {schedule.teacher.lastName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{schedule.subject.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{schedule.room}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(schedule.isActive)}`}>
                            {getStatusIcon(schedule.isActive)}
                            {schedule.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-blue-600">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Calendar View */
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium text-gray-700">Week of {currentDate.toLocaleDateString()}</span>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-7 gap-4">
              {daysOfWeek.map(day => (
                <div key={day} className="space-y-2">
                  <div className={`p-2 rounded-lg text-center text-sm font-medium ${getDayColor(day)}`}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </div>
                  <div className="space-y-2 min-h-[200px]">
                    {getSchedulesForDay(day).map((schedule) => (
                      <div key={schedule.id} className="p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                        <div className="font-medium text-blue-900">
                          {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                        </div>
                        <div className="text-blue-700">{schedule.subject.name}</div>
                        <div className="text-blue-600">{schedule.teacher.firstName} {schedule.teacher.lastName}</div>
                        <div className="text-blue-600">{schedule.room}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredSchedules.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No schedules found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
          <button className="btn-primary">Add New Schedule</button>
        </div>
      )}

      {/* Results Summary */}
      {filteredSchedules.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600">
            Showing {filteredSchedules.length} of {schedules.length} schedules
          </p>
        </div>
      )}
    </div>
  );
};

export default SchedulesPage; 