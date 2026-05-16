function Sidebar({ sort, time, articleCount, setSort, setTime, changeArticleCount }) {
  return (
    <aside id="filter-panel" className="filter-panel">
      <input
        id="article-count-input"
        className="article-count-input"
        type="number"
        value={articleCount}
        onChange={(e) => changeArticleCount(e.target.value)}
      />

      <button id="search-button" className="search-button">
        Search
      </button>

      <section id="sort-section" className="filter-section">
        <h2 className="filter-heading">Sort By:</h2>

        <label className="filter-option">
          <input
            id="sort-viewed"
            className="sort-radio"
            type="radio"
            name="sort"
            value="viewed"
            checked={sort === "viewed"}
            onChange={(e) => setSort(e.target.value)}
          />
          Most Viewed
        </label>

        <label className="filter-option">
          <input
            id="sort-shared"
            className="sort-radio"
            type="radio"
            name="sort"
            value="shared"
            checked={sort === "shared"}
            onChange={(e) => setSort(e.target.value)}
          />
          Most Shared
        </label>

        <label className="filter-option">
          <input
            id="sort-emailed"
            className="sort-radio"
            type="radio"
            name="sort"
            value="emailed"
            checked={sort === "emailed"}
            onChange={(e) => setSort(e.target.value)}
          />
          Most Emailed
        </label>
      </section>

      <section id="time-section" className="filter-section">
        <h2 className="filter-heading">Time Frame:</h2>

        <label className="filter-option">
          <input
            id="time-day"
            className="time-radio"
            type="radio"
            name="time"
            value="1"
            checked={time === "1"}
            onChange={(e) => setTime(e.target.value)}
          />
          Day
        </label>

        <label className="filter-option">
          <input
            id="time-week"
            className="time-radio"
            type="radio"
            name="time"
            value="7"
            checked={time === "7"}
            onChange={(e) => setTime(e.target.value)}
          />
          Week
        </label>

        <label className="filter-option">
          <input
            id="time-month"
            className="time-radio"
            type="radio"
            name="time"
            value="30"
            checked={time === "30"}
            onChange={(e) => setTime(e.target.value)}
          />
          Month
        </label>
      </section>
    </aside>
  );
}

export default Sidebar;