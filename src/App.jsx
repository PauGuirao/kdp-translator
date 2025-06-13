import { useState, useEffect } from "react";
import categoryData from "./categories.json";
import "./App.css";

export default function CategoryTranslator() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [language, setLanguage] = useState("de");
  const [categories, setCategories] = useState([]);
  const [subCategory1, setSubCategory1] = useState("");
  const [subCategory2, setSubCategory2] = useState("");
  const [subCategory3, setSubCategory3] = useState("");
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);

  useEffect(() => {
    const categoryKeys = Object.keys(categoryData);
    setCategories(categoryKeys);
    setSelectedCategory(categoryKeys[0]);
  }, []);

  const getFirstLang = (cat) => Object.keys(categoryData[cat] || {})[0];

  useEffect(() => {
    if (!selectedCategory) {
      setOptions1([]);
      return;
    }
    const lang = getFirstLang(selectedCategory);
    const children = categoryData[selectedCategory]?.[lang]?.children || {};
    setOptions1(Object.keys(children));
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory || !subCategory1) {
      setOptions2([]);
      return;
    }
    const lang = getFirstLang(selectedCategory);
    const child =
      categoryData[selectedCategory]?.[lang]?.children?.[subCategory1] || {};
    setOptions2(Object.keys(child.children || {}));
  }, [selectedCategory, subCategory1]);

  useEffect(() => {
    if (!selectedCategory || !subCategory1 || !subCategory2) {
      setOptions3([]);
      return;
    }
    const lang = getFirstLang(selectedCategory);
    const child =
      categoryData[selectedCategory]?.[lang]?.children?.[subCategory1]?.children?.[
        subCategory2
      ] || {};
    setOptions3(Object.keys(child.children || {}));
  }, [selectedCategory, subCategory1, subCategory2]);

  const getTranslated = (level) => {
    const path = [subCategory1, subCategory2, subCategory3];
    let current = categoryData[selectedCategory]?.[language];
    if (!current) return "N/A";
    if (level === 1) return current.label;
    current = current.children?.[path[0]];
    if (!current) return "N/A";
    if (level === 2) return current[language] || "N/A";
    current = current.children?.[path[1]];
    if (!current) return "N/A";
    if (level === 3) return current[language] || "N/A";
    current = current.children?.[path[2]];
    if (!current) return "N/A";
    return current[language] || "N/A";
  };

  return (
    <div className="category-translator-container">
      <h1 className="category-translator-title">KDP Category Translator</h1>
      <div className="category-grid">
        <div className="form-section">
          <div className="form-group">
            <label>Category Level 1 (EN)</label>
            <select
              className="form-control"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSubCategory1("");
                setSubCategory2("");
                setSubCategory3("");
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {options1.length > 0 && (
            <div className="form-group">
              <label>Category Level 2 (EN)</label>
              <select
                className="form-control"
                value={subCategory1}
                onChange={(e) => {
                  setSubCategory1(e.target.value);
                  setSubCategory2("");
                  setSubCategory3("");
                }}
              >
                <option value="">Select...</option>
                {options1.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}

          {options2.length > 0 && (
            <div className="form-group">
              <label>Category Level 3 (EN)</label>
              <select
                className="form-control"
                value={subCategory2}
                onChange={(e) => {
                  setSubCategory2(e.target.value);
                  setSubCategory3("");
                }}
              >
                <option value="">Select...</option>
                {options2.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}

          {options3.length > 0 && (
            <div className="form-group">
              <label>Category Level 4 (EN)</label>
              <select
                className="form-control"
                value={subCategory3}
                onChange={(e) => setSubCategory3(e.target.value)}
              >
                <option value="">Select...</option>
                {options3.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="result-section">
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

          <div className="result-box">
            <strong>Translated Category Level 1:</strong> <br /> {getTranslated(1)}
          </div>

          <div className="result-box">
            <strong>Translated Category Level 2:</strong> <br /> {getTranslated(2)}
          </div>

          <div className="result-box">
            <strong>Translated Category Level 3:</strong> <br /> {getTranslated(3)}
          </div>

          <div className="result-box">
            <strong>Translated Category Level 4:</strong> <br /> {getTranslated(4)}
          </div>
        </div>
      </div>
      <footer className="footer">
        Created by{' '}
        <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer">
          @yourtwitter
        </a>
      </footer>
    </div>
  );
}
