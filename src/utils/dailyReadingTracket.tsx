import axios from 'axios';

const STORAGE_KEY_TIME = 'readingTimeToday';
const STORAGE_KEY_PAGES = 'pagesReadToday';

const getCurrentUserId = async () => {
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_BASE_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then();
  return response.data.id;
};

export const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const getReadingTimeToday = () => {
  const stored = localStorage.getItem(STORAGE_KEY_TIME);
  if (stored) {
    const { userId, date, minutes } = JSON.parse(stored);
    if (date === getTodayDateString() && userId === getCurrentUserId()) {
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
    JSON.stringify({
      userId: getCurrentUserId(),
      date: today,
      minutes: newMinutes,
    })
  );
};

export const getPagesReadToday = () => {
  const stored = localStorage.getItem(STORAGE_KEY_PAGES);
  if (stored) {
    const { userId, date, pages } = JSON.parse(stored);
    if (date === getTodayDateString() && userId === getCurrentUserId()) {
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
    JSON.stringify({
      userId: getCurrentUserId(),
      date: today,
      pages: newPagesReadAmount,
    })
  );
};
