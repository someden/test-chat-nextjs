'use client';

import { deleteUserAction } from '@/actions/user';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  return (
    <Button onClick={() => deleteUserAction()}>Logout</Button>
  );
}
