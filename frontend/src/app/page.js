"use client";

import { useState } from "react";
import api from "../lib/api";
import "./scraper.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await api.post("/api/scrape", { url });
      setData(res.data);
    } catch (err) {
      const message = err?.response?.data?.detail || err.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleScrape();
    }
  };

  return (
    <div className="scraper-container">
      <div className="scraper-wrapper">
        <div className="scraper-header">
          <div className="scraper-icon">
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <h1 className="scraper-title">Web Scraper</h1>
          <p className="scraper-subtitle">Enter any URL to extract and analyze website data</p>
        </div>

        <div className="scraper-card">
          <div className="input-group">
            <label className="input-label">Enter Website URL</label>
            <input
              type="url"
              className="scraper-input"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          <button 
            onClick={handleScrape} 
            disabled={loading} 
            className={`scraper-button ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Processing...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Start Scraping
              </>
            )}
          </button>

          {error && (
            <div className="alert alert-error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <strong>Error</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          {data && !loading && (
            <div className="alert alert-success">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div>
                <strong>Success</strong>
                <p>Website data extracted successfully</p>
              </div>
            </div>
          )}
        </div>

        {data && (
          <div className="results-card">
            <div className="results-header">
              <h2>Extracted Data</h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                }}
                className="copy-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </button>
            </div>
            <pre className="results-pre">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}

        <div className="scraper-footer">
          Powered by Web Scraping API
        </div>
      </div>
    </div>
  );
}