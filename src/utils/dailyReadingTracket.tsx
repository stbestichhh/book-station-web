const STORAGE_KEY = 'readingTimeToday';

export const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const getReadingTimeToday = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const { date, minutes } = JSON.parse(stored);
    if (date === getTodayDateString()) {
      return minutes;
    }
  }
  return 0;
};

export const addReadingMinutesToday = (minutesToAdd: number) => {
  const today = getTodayDateString();
  const currentMinutes = getReadingTimeToday();
  const newMinutes = currentMinutes + minutesToAdd;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ date: today, minutes: newMinutes })
  );
};
