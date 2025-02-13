export function formatTime(time: string): string {
  const date = new Date(time);
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
}

export function getFormattedTimes(time: {
  departure: string;
  arrival: string;
}) {
  const formattedDeparture = formatTime(time.departure);
  const formattedArrival = formatTime(time.arrival);
  return `${formattedDeparture} - ${formattedArrival}`;
}

export function getEstimatedTime(time: {
  departure: string;
  arrival: string;
}): string {
  const departureDate = new Date(time.departure);
  const arrivalDate = new Date(time.arrival);

  const differenceInMilliseconds =
    arrivalDate.getTime() - departureDate.getTime();

  const differenceInMinutes = Math.floor(
    differenceInMilliseconds / (1000 * 60)
  );

  const hours = Math.floor(differenceInMinutes / 60);
  const minutes = differenceInMinutes % 60;

  return `${hours} hr ${minutes} min`;
}
