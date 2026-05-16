import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "";

function App() {
  const [sort, setSort] = useState("viewed");
  const [time, setTime] = useState("30");
  const [articleCount, setArticleCount] = useState("10");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 6;

  useEffect(() => {
    getArticles();
  }, [sort, time]);

  async function getArticles() {
    setLoading(true);
    setCurrentPage(1);

    try {
      const url = `https://api.nytimes.com/svc/mostpopular/v2/${sort}/${time}.json?api-key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.results || []);
    } catch (error) {
      console.log(error);
      setArticles([]);
    }

    setLoading(false);
  }

  function changeArticleCount(value) {
    setArticleCount(value);
    setCurrentPage(1);

    if (Number(value) > 15) {
      alert("number is higher than 15");
    }
  }

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

  const maxArticles = Math.min(Number(articleCount) || 0, 15);
  const visibleArticles = articles.slice(0, maxArticles);
  const totalPages = Math.min(Math.ceil(visibleArticles.length / articlesPerPage), 3);

  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = visibleArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <main id="page-wrapper" className="page-wrapper">
      <Sidebar
        sort={sort}
        time={time}
        articleCount={articleCount}
        setSort={setSort}
        setTime={setTime}
        changeArticleCount={changeArticleCount}
      />

      <section id="articles-section" className="articles-section">
        <Title title={`${sortText[sort]} - ${timeText[time]}`} />

        {loading ? (
          <p id="loading-message" className="loading-message">
            Loading articles...
          </p>
        ) : (
          <>
            <ArticleList articles={currentArticles} startIndex={startIndex} />

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </section>
    </main>
  );
}

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

function Title({ title }) {
  return (
    <h1 id="articles-title" className="articles-title">
      {title}
    </h1>
  );
}

function ArticleList({ articles, startIndex }) {
  return (
    <div id="articles-container" className="articles-container">
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          article={article}
          number={startIndex + index + 1}
        />
      ))}
    </div>
  );
}

function ArticleCard({ article, number }) {
  const title = article?.title || "Article not available";
  const abstract = article?.abstract || "No article information available.";
  const date = article?.published_date || "";
  const url = article?.url || "#";
  const imageUrl = article?.media?.[0]?.["media-metadata"]?.[0]?.url || "";

  return (
    <article className="article-card">
      <div className="article-header">
        <h2 className="article-title">
          <a className="article-link" href={url} target="_blank">
            {number}) {title}
          </a>
        </h2>
        <span className="article-date">{date}</span>
      </div>

      <div className="article-body">
        {imageUrl ? (
          <img className="article-image" src={imageUrl} alt={title} />
        ) : (
          <div className="article-image no-image">No Image</div>
        )}

        <p className="article-abstract">{abstract}</p>
      </div>
    </article>
  );
}

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  return (
    <div id="pagination" className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? "page-button active" : "page-button"}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default App;