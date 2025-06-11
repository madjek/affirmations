import { useLogoutMutation } from '~/hooks/useAuth';
import { Logout } from '~/lib/icons/Logout';
import { Button } from './ui/button';

export function LogoutButton() {
  const logout = useLogoutMutation();

  return (
    <Button
      variant={'ghost'}
      onPress={() => logout.mutate()}
      className="active:opacity-70 web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      <Logout className="text-foreground" size={23} strokeWidth={1.25} />
    </Button>
  );
}
