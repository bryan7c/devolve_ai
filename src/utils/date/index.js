export function formatDate(date, {separator = "/", monthString = false} = {}) {
  date = new Date(date);
  const year = date.getFullYear();
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const monthText = monthNames[date.getMonth()];
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (monthString) {
    return `${day}${separator}${monthText}${separator}${year}`;
  } else {
    return `${day}${separator}${month}${separator}${year}`;
  }
}
