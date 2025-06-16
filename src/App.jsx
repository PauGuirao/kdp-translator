import { useState } from "react";
import "./App.css";

export default function CategoryTranslator() {
  const [language, setLanguage] = useState("de");
  const [levels, setLevels] = useState(["", "", "", ""]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    setLevels((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const translate = async () => {
    const path = levels.filter(Boolean).join(" > ");
    if (!path) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const prompt =
      `You are an expert publisher specialized in marketing and KDP. ` +
      `Give the three closest equivalent Amazon KDP category paths in ${language} for the category: ${path}. ` +
      `Format each option as [Cat1,Cat2,Cat3]. Don't include "Bücher" as a category. Don't add text or any other thing. I just want this:
      Option 1: [Cat1,Cat2,Cat3,...]
      Option 2: [Cat1,Cat2,Cat3,...]
      Option 3: [Cat1,Cat2,Cat3,...] For each option give the accuracy value` ;

    try {
      setLoading(true);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        },
      );
      const data = await response.json();
      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "N/A";
      setResult(text);
    } catch (err) {
      console.error(err);
      setResult("Error retrieving translation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-translator-container">
      <h1 className="category-translator-title">KDP Category Translator</h1>
      <div className="category-grid">
        <div className="left-column">
          {levels.map((lvl, idx) => (
            <div className="category-row" key={idx}>
              <div className="form-group">
                <label>{`Level ${idx + 1} (EN)`}</label>
                <input
                  className="form-control"
                  type="text"
                  value={lvl}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  placeholder={`Level ${idx + 1}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="right-column">
          <div className="language-select">
            <label>Select Language</label>
            <select
              className="form-control"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="de">German</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="it">Italian</option>
            </select>
          </div>

          {result && (
            <div className="translation-group">
              <div className="result-title">Result</div>
              <div className="result-box">{result}</div>
            </div>
          )}
        </div>
      </div>

      <button className="search-button" onClick={translate} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
      <footer className="footer">
        Created by{' '}
        <a href="https://twitter.com/CactusGuica" target="_blank" rel="noopener noreferrer">
          @CactusGuica
        </a>
      </footer>
    </div>
  );
}
