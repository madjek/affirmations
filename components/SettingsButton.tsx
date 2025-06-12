import { Link, RelativePathString } from 'expo-router';
import { Settings } from '~/lib/icons/Settings';
import { Button } from './ui/button';

export function SettingsButton() {
  return (
    <Link href={'/settings' as RelativePathString} asChild>
      <Button
        variant={'ghost'}
        className="active:opacity-70 web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
      >
        <Settings className="text-foreground" size={23} strokeWidth={1.25} />
      </Button>
    </Link>
  );
}
