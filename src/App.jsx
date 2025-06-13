import { useState, useEffect } from "react";
import categoryData from "./categories.json";

export default function CategoryTranslator() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [language, setLanguage] = useState("de");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(Object.keys(categoryData));
    setSelectedCategory(Object.keys(categoryData)[0]);
  }, []);

  const translated = categoryData[selectedCategory]?.[language] || "N/A";

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">KDP Category Translator</h1>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Category (EN)</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Language</label>
        <select
          className="w-full p-2 border rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="de">German</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="it">Italian</option>
        </select>
      </div>
      <div className="p-4 bg-gray-100 rounded text-lg">
        <strong>Translated Category:</strong> {translated}
      </div>
    </div>
  );
}
