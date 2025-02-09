'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface UserButtonProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export default function UserButton({ user }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-10 w-10 bg-primary">
          {user.image ? (
            <div className="relative aspect-square h-full w-full">
              <Image
                src={user.image}
                alt={`${user.name} profile picture`}
                referrerPolicy="no-referrer"
                fill
              />
            </div>
          ) : (
            <AvatarFallback>
              <span>
                {user.name.split(' ')[0][0].toUpperCase() +
                  user.name.split(' ')[1][0].toUpperCase()}
              </span>
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-[200] bg-background" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-gray-300">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/profile/settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/notifications">Notifications</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
