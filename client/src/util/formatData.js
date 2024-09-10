export const formatDate = (dateInput) => {
  let date;

  if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    date = new Date(dateInput);

    if (isNaN(date.getTime())) {
      return "";
    }
  }

  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth() + 1;
  const utcDay = date.getUTCDate();

  const year = String(utcYear).padStart(4, "0");
  const month = String(utcMonth).padStart(2, "0");
  const day = String(utcDay).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
