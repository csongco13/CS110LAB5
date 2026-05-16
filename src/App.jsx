import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Title from "./components/Title";
import List from "./components/List";
import Pagination from "./components/Pagination";

const API_KEY = "";

function App() {
  const [sort, setSort] = useState("viewed");
  const [time, setTime] = useState("30");
  const [articleCount, setArticleCount] = useState("");
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

    if (Number(value) > 15) {
      alert("Articles can't go beyond 15");
    }

    setCurrentPage(1);
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

  let maxArticles = Number(articleCount);

  if (maxArticles > 15) maxArticles = 15;   
  else if (maxArticles <= 0) maxArticles = 6;

  const visibleArticles = articles.slice(0, maxArticles);

  let totalPages = Math.ceil(visibleArticles.length / articlesPerPage);

  if (totalPages > 3) totalPages = 3;

  const startIndex = (currentPage - 1) * articlesPerPage;

  const currentArticles = visibleArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

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
        <Title
          title={`${sortText[sort]} - ${timeText[time]}`}
        />

        {loading ? (
          <p className="loading-message">
            Please wait
          </p>
        ) : (
          <>
            <List
              articles={currentArticles}
              startIndex={startIndex}
            />

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


export default App;