'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from '@nextui-org/react';
import { AvatarButtonProps } from '@/types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function AvatarButton({ name, position }: AvatarButtonProps) {
    const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('position');
    router.push('/login');
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: 'https://www.svgrepo.com/show/418965/user-avatar-profile.svg',
            }}
            className="transition-transform"
            description={position}
            name={name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="logout" color="danger" onPress={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
