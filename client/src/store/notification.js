import { create } from "zustand";

const useNotificationStore = create((set, get) => ({
  notification: null,
  actions: {
    showNotification: ({ message, type, durationInSeconds = 3 }) => {
      const existingDuration = get().notification?.duration;

      if (existingDuration) {
        clearTimeout(existingDuration);
      }

      const timer = window.setTimeout(() => {
        set(() => ({ notification: null }));
      }, durationInSeconds * 1000);

      set(() => ({ notification: { message, type, duration: timer } }));
    },
  },
}));

export const useNotification = () => {
  const notification = useNotificationStore((state) => state.notification);
  return notification;
};
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
