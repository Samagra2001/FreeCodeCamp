import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote({
        text: response.data.content,
        author: response.data.author
      });
    } catch (error) {
      console.error('Error fetching the quote', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + quote.text + '" - ' + quote.author)}`;
    return tweetUrl;
  };

  return (
    <div id="quote-box" className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ width: '300px', textAlign: 'center' }}>
        <div id="text" className="mb-3" style={{ fontSize: '1.5rem' }}>
          <p>"{quote.text}"</p>
        </div>
        <div id="author" className="mb-3" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          - {quote.author}
        </div>
        <div className="d-flex justify-content-between">
          <button
            id="new-quote"
            className="btn btn-primary"
            onClick={fetchQuote}
          >
            New Quote
          </button>
          <a
            id="tweet-quote"
            className="btn btn-info"
            href={tweetQuote()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
