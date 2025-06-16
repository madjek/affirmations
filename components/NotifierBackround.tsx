import notifee from '@notifee/react-native';

export default function NotifierBackround() {
  notifee.onBackgroundEvent(async ({ type, detail }) => {});

  return null;
}
