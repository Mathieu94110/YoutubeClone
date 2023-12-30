export const timeSince = (date) => {
  const second = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

  let interval = second / 31536000;

  if (interval > 1) {
    return (
      Math.floor(interval) +
      (Math.floor(interval) > 2 ? ' ' + 'ans' : ' ' + 'an')
    );
  }

  interval = second / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' ' + 'mois';
  }
  interval = second / 86400;
  if (interval > 1) {
    return (
      Math.floor(interval) +
      (Math.floor(interval) > 2 ? ' ' + 'jours' : ' ' + 'jour')
    );
  }

  interval = second / 3600;

  if (interval > 1) {
    return (
      Math.floor(interval) +
      (Math.floor(interval) > 2 ? ' ' + 'heures' : ' ' + 'heure')
    );
  }
  interval = second / 60;

  if (interval > 1) {
    return (
      Math.floor(interval) +
      (Math.floor(interval) > 2 ? ' ' + 'minutes' : ' ' + 'minute')
    );
  }

  return (
    Math.floor(second) +
    (Math.floor(second) > 1 ? ' ' + 'secondes' : ' ' + 'seconde')
  );
};
