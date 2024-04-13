'use client';

import { useCallback } from 'react';
import Link from 'next/link';
// @ts-ignore
import debounce from 'lodash.debounce';
import { Plus } from 'lucide-react';

import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { buttonVariants } from './ui/button';
import { useTableOptions } from '@/hooks/useTableOptions';

const specialties = [
  'Neuroradiology',
  'Pediatric Radiology',
  'Breast Imaging',
  'Vascular & Interventional Radiology',
  'Musculoskeletal Radiology',
  'Nuclear Radiology',
  'Emergency Radiology',
];

interface FiltersBarProps {
  genderFilter?: boolean;
  statusFilter?: boolean;
  appointmentStatusFilter?: boolean;
  searchFilter?: boolean;
  sortingEnabled?: boolean;
  sortByNameEnabled?: boolean;
  sortByPatientNameEnabled?: boolean;
  sortByDoctorNameEnabled?: boolean;
  sortByAgeEnabled?: boolean;
  sortByDateEnabled?: boolean;
  sortByLastMaintenanceDateEnabled?: boolean;
  sortByPurchaseDateEnabled?: boolean;
  sortByAppointmentDateEnabled?: boolean;
  searchPlaceholder?: string;
  addNewButton?: boolean;
  addNewRoute: string;
  addNewContent: string;
  refetch: () => void;
}

export default function FiltersBar({
  genderFilter = false,
  statusFilter = false,
  appointmentStatusFilter = false,
  searchFilter = false,
  sortingEnabled = false,
  sortByNameEnabled = false,
  sortByPatientNameEnabled = false,
  sortByDoctorNameEnabled = false,
  sortByAgeEnabled = false,
  sortByDateEnabled = false,
  sortByLastMaintenanceDateEnabled = false,
  sortByPurchaseDateEnabled = false,
  sortByAppointmentDateEnabled = false,
  searchPlaceholder,
  addNewButton = true,
  addNewRoute,
  addNewContent,
  refetch,
}: FiltersBarProps) {
  const {
    setCurrentPage,
    sortBy,
    setSortBy,
    searchValue,
    setSearchValue,
    currentGender,
    setCurrentGender,
    currentStatus,
    setCurrentStatus,
    currentAppointmentStatus,
    setCurrentAppointmentStatus,
  } = useTableOptions();

  const request = debounce(async () => {
    refetch();
  }, 500);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  return (
    <div className="flex flex-col justify-between gap-8 md:flex-row">
      <div className="flex flex-col gap-2 sm:flex-row">
        {genderFilter && (
          <Tabs
            value={currentGender}
            onValueChange={(value) => {
              if (value === 'all' || value === 'male' || value === 'female') {
                setCurrentPage(1);
                setCurrentGender(value);
              }
            }}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="male">Male</TabsTrigger>
              <TabsTrigger value="female">Female</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {statusFilter && (
          <Tabs
            value={currentStatus}
            onValueChange={(value) => {
              if (
                value === 'all' ||
                value === 'active' ||
                value === 'inactive'
              ) {
                setCurrentPage(1);
                setCurrentStatus(value);
              }
            }}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {appointmentStatusFilter && (
          <Tabs
            value={currentAppointmentStatus}
            onValueChange={(value) => {
              if (
                value === 'all' ||
                value === 'completed' ||
                value === 'pending' ||
                value === 'cancelled'
              ) {
                setCurrentPage(1);
                setCurrentAppointmentStatus(value);
              }
            }}
            className="w-[350px]"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {sortingEnabled && (
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortByNameEnabled && (
                <SelectGroup>
                  <SelectLabel>Name</SelectLabel>
                  <SelectItem value="name-asc">Sort by name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Sort by name (Z-A)</SelectItem>
                  <SelectSeparator />
                </SelectGroup>
              )}

              {sortByPatientNameEnabled && (
                <SelectGroup>
                  <SelectLabel>Patient Name</SelectLabel>
                  <SelectItem value="patientName-asc">
                    Sort by patient name (A-Z)
                  </SelectItem>
                  <SelectItem value="patientName-desc">
                    Sort by patient name (Z-A)
                  </SelectItem>
                  <SelectSeparator />
                </SelectGroup>
              )}

              {sortByDoctorNameEnabled && (
                <SelectGroup>
                  <SelectLabel>Doctor Name</SelectLabel>
                  <SelectItem value="doctorName-asc">
                    Sort by doctor name (A-Z)
                  </SelectItem>
                  <SelectItem value="doctorName-desc">
                    Sort by doctor name (Z-A)
                  </SelectItem>
                  <SelectSeparator />
                </SelectGroup>
              )}

              {sortByAgeEnabled && (
                <SelectGroup>
                  <SelectLabel>Age</SelectLabel>
                  <SelectItem value="birthDate-desc">
                    Select by age (Younged first)
                  </SelectItem>
                  <SelectItem value="birthDate-asc">
                    Select by age (Oldest first)
                  </SelectItem>
                  <SelectSeparator />
                </SelectGroup>
              )}

              {sortByDateEnabled && (
                <SelectGroup>
                  <SelectLabel>Joined at</SelectLabel>
                  <SelectItem value="createdAt-asc">Oldest first</SelectItem>
                  <SelectItem value="createdAt-desc">Newest first</SelectItem>
                </SelectGroup>
              )}

              {sortByLastMaintenanceDateEnabled && (
                <SelectGroup>
                  <SelectLabel>Last maintenance date</SelectLabel>
                  <SelectItem value="lastMaintenanceDate-asc">
                    Last maintained last
                  </SelectItem>
                  <SelectItem value="lastMaintenanceDate-desc">
                    Last maintained first
                  </SelectItem>
                </SelectGroup>
              )}

              {sortByPurchaseDateEnabled && (
                <SelectGroup>
                  <SelectLabel>Purchase date</SelectLabel>
                  <SelectItem value="purchaseDate-asc">Oldest first</SelectItem>
                  <SelectItem value="purchaseDate-desc">
                    Newest first
                  </SelectItem>
                </SelectGroup>
              )}

              {sortByAppointmentDateEnabled && (
                <SelectGroup>
                  <SelectLabel>Appointment date</SelectLabel>
                  <SelectItem value="appointmentDate-asc">
                    Oldest first
                  </SelectItem>
                  <SelectItem value="appointmentDate-desc">
                    Newest first
                  </SelectItem>
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 sm:flex-row">
        {searchFilter && (
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              debounceRequest();
            }}
          />
        )}
        {addNewButton && (
          <Link
            href={addNewRoute}
            className={buttonVariants({
              className: 'flex w-[150px] items-center gap-1',
            })}
          >
            <Plus />
            {addNewContent}
          </Link>
        )}
      </div>
    </div>
  );
}
