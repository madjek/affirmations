import notifee from '@notifee/react-native';
import React, { useEffect, useRef } from 'react';
import { useMyAffirmationsQuery } from '~/lib/hooks/useAffirmation';
import { useAffirmationIdsStore } from '~/store/affirmationStore';

export const AffirmationNotifier: React.FC = () => {
  const { data: affirmations = [] } = useMyAffirmationsQuery();
  const affirmationIds = useAffirmationIdsStore(
    (state) => state.affirmationIds,
  );

  // Store the index of the last affirmation
  const lastIndexRef = useRef<number>(-1);
  // Store the timestamp of the last notification
  const lastNotificationTimeRef = useRef<number>(0);

  useEffect(() => {
    const filtered = affirmations.filter((a) => affirmationIds.includes(a.id));
    if (filtered.length === 0) return;

    // Check if it's time to send a notification
    const checkAndNotify = async () => {
      const now = Date.now();
      const intervalMs = 60 * 1000; // 1 min

      if (now - lastNotificationTimeRef.current >= intervalMs) {
        lastIndexRef.current = (lastIndexRef.current + 1) % filtered.length;
        const affirmation = filtered[lastIndexRef.current];

        if (affirmation) {
          await notifee.displayNotification({
            body: affirmation.text,
            android: {
              channelId: 'default',
            },
          });
          lastNotificationTimeRef.current = now;
        }
      }
    };

    // Tick every second
    const timerId = setInterval(checkAndNotify, 1000);

    return () => clearInterval(timerId);
  }, [affirmations, affirmationIds]);

  return null;
};
