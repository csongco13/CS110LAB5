import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Title from "./components/Title";
import ArticleList from "./components/ArticleList";
import Pagination from "./components/Pagination";

const API_KEY = "PUT_YOUR_API_KEY_HERE";

function App() {
  const [sort, setSort] = useState("viewed");
  const [time, setTime] = useState("1");
  const [articleCount, setArticleCount] = useState("6");
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

  function handleArticleCountChange(value) {
    setArticleCount(value);

    if (Number(value) > 15) {
      alert("number is higher than 15");
    }

    setCurrentPage(1);
  }

  const maxArticles = Math.min(Number(articleCount) || 0, 15);
  const visibleArticles = articles.slice(0, maxArticles);

  const totalPages = Math.min(
    Math.ceil(visibleArticles.length / articlesPerPage),
    3
  );

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
        setArticleCount={handleArticleCountChange}
      />

      <section id="articles-section" className="articles-section">
        <Title sort={sort} time={time} />

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

export default App;