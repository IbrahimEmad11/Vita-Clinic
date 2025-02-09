import { create } from 'zustand';

import type { AppointmentStatus } from '@/types/appointments.type';

type FiltersStore = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  countPerPage: number;
  setCountPerPage: (count: number) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  currentGender: string;
  setCurrentGender: (gender: 'all' | 'male' | 'female') => void;
  currentStatus: string;
  setCurrentStatus: (status: 'all' | 'active' | 'inactive') => void;
  currentAppointmentStatus: 'all' | AppointmentStatus;
  setCurrentAppointmentStatus: (status: 'all' | AppointmentStatus) => void;
  currentVisibleAppointments: 'all' | 'yours';
  setCurrentVisibleAppointments: (status: 'all' | 'yours') => void;
  currentNotificationStatus: 'all' | 'unread';
  setCurrentNotificationStatus: (status: 'all' | 'unread') => void;
  reset: () => void;
};

export const useFiltersStore = create<FiltersStore>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  countPerPage: 10,
  setCountPerPage: (count) => set({ countPerPage: count }),
  sortBy: 'createdAt-desc',
  setSortBy: (sortBy) => set({ sortBy }),
  searchValue: '',
  setSearchValue: (searchValue) => set({ searchValue }),
  currentGender: 'all',
  setCurrentGender: (gender) => set({ currentGender: gender }),
  currentStatus: 'all',
  setCurrentStatus: (status) => set({ currentStatus: status }),
  currentAppointmentStatus: 'all',
  setCurrentAppointmentStatus: (status) =>
    set({ currentAppointmentStatus: status }),
  currentVisibleAppointments: 'all',
  setCurrentVisibleAppointments: (status) =>
    set({ currentVisibleAppointments: status }),
  currentNotificationStatus: 'all',
  setCurrentNotificationStatus: (status) =>
    set({ currentNotificationStatus: status }),
  reset: () =>
    set({
      currentPage: 1,
      countPerPage: 10,
      sortBy: 'createdAt-desc',
      searchValue: '',
      currentGender: 'all',
      currentStatus: 'all',
      currentAppointmentStatus: 'all',
      currentVisibleAppointments: 'all',
      currentNotificationStatus: 'all',
    }),
}));
