const formattedMsToDateString = (ms, format ="en-Us") => {
  const tempDate = new Date();
  tempDate.setTime(this.date);
  return new Intl.DateTimeFormat('en-US').format(new date(this.date));
}
