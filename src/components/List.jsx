function List({ articles, startIndex }) {
  return (
    <div
      id="articles-container"
      className="articles-container"
    >
      {articles.map((article, index) => {
        let title = "Article not available";
        let abstract = "No article information available.";
        let date = "";
        let url = "#";
        let imageUrl = "";

        try {
          title = article.title;
          abstract = article.abstract;
          date = article.published_date;
          url = article.url;

          imageUrl =
            article.media[0]["media-metadata"][0].url;
        } catch (error) {
          console.log(error);
        }

        return (
          <article
            key={index}
            className="article-card"
          >
            <div className="article-header">
              <h2 className="article-title">
                <a
                  className="article-link"
                  href={url}
                  target="_blank"
                >
                  {startIndex + index + 1}) {title}
                </a>
              </h2>

              <span className="article-date">
                {date}
              </span>
            </div>

            <div className="article-body">
              {imageUrl ? (
                <img
                  className="article-image"
                  src={imageUrl}
                  alt={title}
                />
              ) : (
                <div className="article-image no-image">
                  No Image
                </div>
              )}

              <p className="article-abstract">
                {abstract}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;