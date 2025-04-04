const STORAGE_KEY_TIME = 'readingTimeToday';
const STORAGE_KEY_PAGES = 'pagesReadToday';

export const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const getReadingTimeToday = (currentUserId: string) => {
  const stored = localStorage.getItem(STORAGE_KEY_TIME);
  if (stored) {
    const { userId, date, minutes } = JSON.parse(stored);
    if (date === getTodayDateString() && userId === currentUserId) {
      return minutes;
    }
  }
  return 0;
};

export const addReadingMinutesToday = (
  minutesToAdd: number,
  currentUserId: string
) => {
  const today = getTodayDateString();
  const currentMinutes = getReadingTimeToday(currentUserId);
  const newMinutes = currentMinutes + minutesToAdd;

  localStorage.setItem(
    STORAGE_KEY_TIME,
    JSON.stringify({
      userId: currentUserId,
      date: today,
      minutes: newMinutes,
    })
  );
};

export const getPagesReadToday = (currentUserId: string) => {
  const stored = localStorage.getItem(STORAGE_KEY_PAGES);
  if (stored) {
    const { userId, date, pages } = JSON.parse(stored);
    if (date === getTodayDateString() && userId === currentUserId) {
      return pages;
    }
  }
  return 0;
};

export const addPagesReadToday = (
  pagesToAdd: number,
  currentUserId: string
) => {
  const today = getTodayDateString();
  const current = getPagesReadToday(currentUserId);
  const newPagesReadAmount = current + pagesToAdd;

  localStorage.setItem(
    STORAGE_KEY_PAGES,
    JSON.stringify({
      userId: currentUserId,
      date: today,
      pages: newPagesReadAmount,
    })
  );
};
