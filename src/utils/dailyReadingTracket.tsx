const STORAGE_KEY_TIME = 'readingTimeToday';
const STORAGE_KEY_PAGES = 'pagesReadToday';

export const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const getReadingTimeToday = () => {
  const stored = localStorage.getItem(STORAGE_KEY_TIME);
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
    STORAGE_KEY_TIME,
    JSON.stringify({ date: today, minutes: newMinutes })
  );
};

export const getPagesReadToday = () => {
  const stored = localStorage.getItem(STORAGE_KEY_PAGES);
  if (stored) {
    const { date, pages } = JSON.parse(stored);
    if (date === getTodayDateString()) {
      return pages;
    }
  }
  return 0;
};

export const addPagesReadToday = (pagesToAdd: number) => {
  const today = getTodayDateString();
  const current = getPagesReadToday();
  const newPagesReadAmount = current + pagesToAdd;

  localStorage.setItem(
    STORAGE_KEY_PAGES,
    JSON.stringify({ date: today, pages: newPagesReadAmount })
  );
};
