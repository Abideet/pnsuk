import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { fetch } from "../../services/services";
import Article from "../Article";


const ArticleScreen = (props) => {

  const { id } = useParams();


  const [article, setArticle] = useState({});
  const [articleSuggestions, setArticleSuggestions] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`article-screen/${id}`)
        .then(response => {
          setArticle(response.data.article);
          setArticleSuggestions(response.data.articleSuggestions);
        });
    }
  }, [id]);

  return (
    <div>
      <div>
      <h1>{article.title}</h1>
      <p>{article.date}</p>
      <p>{article.text}</p>
      {article.images && article.images.map((image) => 
        <img key={image.id} src={`http://localhost:3000/assets/media/article/${image.image}`} alt={image.title} />
      )}

      </div>
      <div>
        <h2>Related Articles</h2>
        <div className="grid grid-cols-4 gap-8">
          {articleSuggestions?.map((article) => (
            <Article
              key={article.id}
              id={article.id}
              images={article.images}
              title={article.title}
              date={article.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleScreen;