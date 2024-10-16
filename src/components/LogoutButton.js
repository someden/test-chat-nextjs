'use client';

import { Button } from '@/components/ui/button';
import { deleteUser } from '@/lib/user';

export function LogoutButton() {
  return (
    <Button onClick={() => deleteUser()}>Logout</Button>
  );
}
