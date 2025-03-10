export type Action = {
  id: string;
  targetId: string;
  targetName: string;
  type: string;
  action: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    role: 'admin' | 'doctor' | 'patient';
    firstName: string;
    lastName: string;
  };
  targetUser?: {
    id: string;
    role: 'admin' | 'doctor' | 'patient';
    firstName: string;
    lastName: string;
  };
};

export type Notification = {
  id: string;
  targetId: string;
  targetName: string;
  type: string;
  isRead: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
