export const getFormattedDateTime = (timeStamp = 0) => {
  const date = new Date(timeStamp );
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes =  date.getMinutes();

  const time = `${hours}:${minutes}`;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return { time, date: `${day}.${month}.${year}` };
}
