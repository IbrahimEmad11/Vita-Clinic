'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Edit, Info, Plus, Trash } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DeleteAlert from '@/components/DeleteAlert';
import Modal from '@/components/Modal';
import { Separator } from '@/components/ui/separator';

import type { PatientSurgeryField } from './PatientSurgeries';

interface PatientSurgeryItemProps {
  surgery: PatientSurgeryField;
  isEditDisabled?: boolean;
  onEdit: () => void;
  isDeleteDisabled?: boolean;
  onDelete: () => void;
  view?: boolean;
}

export default function PatientSurgeryItem({
  surgery,
  isEditDisabled = false,
  onEdit,
  isDeleteDisabled = false,
  onDelete,
  view = false,
}: PatientSurgeryItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <Card className="col-span-1 rounded-lg transition-all">
      <div className="truncate px-4 pt-6">
        <div className="flex flex-col gap-0.5">
          <h3 className="truncate text-lg font-medium">
            {surgery.surgery.name}
          </h3>
          {surgery.date && (
            <span className="mt-0.5 truncate">
              Performed at: {format(new Date(surgery.date), 'dd MMM yyyy')}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {format(new Date(surgery.createdAt), 'dd MMM yyyy')}
        </div>

        <div className="flex flex-wrap gap-2">
          {view ? (
            <Button size="sm" onClick={() => setIsDetailsOpen(true)}>
              <Info className="mr-2 h-4 w-4" /> Details
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="secondary"
                disabled={isEditDisabled}
                onClick={onEdit}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                disabled={isDeleteDisabled}
                onClick={() => setIsDeleting(true)}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <DeleteAlert
        title={`Delete ${surgery.surgery.name}`}
        description={`Are you sure you want to delete this surgery (${surgery.surgery.name}) from this EMR?`}
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onDelete={onDelete}
      />

      <Modal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        className="h-fit md:overflow-y-auto"
      >
        <div className="space-y-6 px-4 py-2 text-foreground">
          <div className="w-full space-y-2">
            <div>
              <h3 className="text-lg font-medium">Surgery Details</h3>
              <p className="text-sm text-muted-foreground">
                Details of the surgery.
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium text-primary">Surgery</p>
              <p>{surgery.surgery.name}</p>
            </div>

            {surgery.date && (
              <div className="flex flex-col gap-1">
                <p className="font-medium text-primary">Surgery Date</p>
                <p>{format(new Date(surgery.date), 'dd MMM yyyy')}</p>
              </div>
            )}

            {surgery.surgery.description && (
              <div className="flex flex-col gap-1">
                <p className="font-medium text-primary">Surgery Description</p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: surgery.surgery.description.replace(
                      /\n/g,
                      '<br />'
                    ),
                  }}
                />
              </div>
            )}

            {surgery.notes && (
              <div className="flex flex-col gap-1">
                <p className="font-medium text-primary">Additional Notes</p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: surgery.notes.replace(/\n/g, '<br />'),
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </Card>
  );
}
