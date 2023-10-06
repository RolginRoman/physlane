// import   parseISO from 'date-fns/parseISO';

export const parseDate = <T extends string | null | undefined>(
  date: T
): Exclude<T, string> | Date => {
  if (date !== null && date !== undefined) {
    // return parseISO(date);
    return new Date(Date.parse(date));
  } else {
    return date as Exclude<T, string>;
  }
};
