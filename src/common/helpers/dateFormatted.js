import format from 'date-fns/format';
import es from 'date-fns/locale/es';

export const getDateFormatted = (dateNoFormatted) => {
  const dayInText = format(dateNoFormatted, 'EEEE', {locale: es});
  const dayInNumber = format(dateNoFormatted, 'd', {locale: es});
  const month = format(dateNoFormatted, 'LLLL', {locale: es});
  const year = format(dateNoFormatted, 'yyyy', {locale: es});
  return `${dayInText} ${dayInNumber}, de ${month} del ${year}`;
};

export const getTimeFormatted = (dateNoFormatted) => {
  const hour = format(dateNoFormatted, 'h:mm', {locale: es});
  const time = format(dateNoFormatted, 'bbbb', {locale: es});
  return `${hour} ${time}`;
};

export const getFullTimeFormattedInText = (dateNoFormatted) => {
  return `${getDateFormatted(dateNoFormatted)} a las ${getTimeFormatted(
    dateNoFormatted,
  )}`;
};
