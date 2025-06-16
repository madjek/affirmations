import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { useEffect, useState } from 'react';

export function useNotificationPermissionStatus() {
  const [status, setStatus] = useState<AuthorizationStatus | null>(null);

  useEffect(() => {
    (async () => {
      const settings = await notifee.getNotificationSettings();
      setStatus(settings.authorizationStatus);
    })();
  }, []);

  return status;
}
