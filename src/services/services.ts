export const determineTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;
  if (hours < 12) {
    timeOfDay = 'Good Morning';
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = 'Good Afternoon';
  } else {
    timeOfDay = 'Good Evening';
  }
  return timeOfDay;
};
