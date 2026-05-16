function ArticleCard({ article, number }) {
  let title = "Article not available";
  let abstract = "No article information available.";
  let date = "";
  let url = "#";
  let imageUrl = "";

  try {
    title = article.title || "Article not available";
    abstract = article.abstract || "No article information available.";
    date = article.published_date || "";
    url = article.url || "#";
    imageUrl = article.media?.[0]?.["media-metadata"]?.[0]?.url || "";
  } catch (error) {
    title = "Article not available";
  }

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

export default ArticleCard;