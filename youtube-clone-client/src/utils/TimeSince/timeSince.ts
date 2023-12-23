export const timeSince = (date) => {
  const second = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

  let interval = second / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + 'années';
  }

  interval = second / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + 'mois';
  }
  interval = second / 86400;
  if (interval > 1) {
    return Math.floor(interval) + 'jours';
  }

  interval = second / 3600;

  if (interval > 1) {
    return Math.floor(interval) + 'heures';
  }
  interval = second / 60;

  if (interval > 1) {
    return Math.floor(interval) + 'minutes';
  }

  return Math.floor(second) + 'secondes';
};
