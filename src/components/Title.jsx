function Title({ sort, time }) {
  const sortText = {
    viewed: "Most Viewed",
    shared: "Most Shared",
    emailed: "Most Emailed",
  };

  const timeText = {
    1: "Day",
    7: "Week",
    30: "Month",
  };

  return (
    <h1 id="articles-title" className="articles-title">
      {sortText[sort]} - {timeText[time]}
    </h1>
  );
}

export default Title;