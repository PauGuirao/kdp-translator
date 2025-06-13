import { useState, useEffect } from "react";
import categoryData from "./categories.json";

export default function CategoryTranslator() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [language, setLanguage] = useState("de");
  const [categories, setCategories] = useState([]);
  const [subCategory1, setSubCategory1] = useState("");
  const [subCategory2, setSubCategory2] = useState("");
  const [subCategory3, setSubCategory3] = useState("");

  useEffect(() => {
    const categoryKeys = Object.keys(categoryData);
    setCategories(categoryKeys);
    setSelectedCategory(categoryKeys[0]);
  }, []);

  const getTranslated = (level, path) => {
    let current = categoryData[selectedCategory]?.[language];
    if (!current) return "N/A";
    if (level === 1) return current.label;
    if (level === 2) return current.children?.[path[0]]?.[language] || "N/A";
    if (level === 3) return current.children?.[path[0]]?.children?.[path[1]]?.[language] || "N/A";
    if (level === 4) return current.children?.[path[0]]?.children?.[path[1]]?.children?.[path[2]]?.[language] || "N/A";
    return "N/A";
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">KDP Category Translator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-semibold">Category Level 1 (EN)</label>
          <select
            className="w-full p-2 border rounded mb-4"
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

          <label className="block mb-1 font-semibold">Category Level 2</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            value={subCategory1}
            onChange={(e) => setSubCategory1(e.target.value)}
            placeholder="(optional)"
          />

          <label className="block mb-1 font-semibold">Category Level 3</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            value={subCategory2}
            onChange={(e) => setSubCategory2(e.target.value)}
            placeholder="(optional)"
          />

          <label className="block mb-1 font-semibold">Category Level 4</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={subCategory3}
            onChange={(e) => setSubCategory3(e.target.value)}
            placeholder="(optional)"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Select Language</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="de">German</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="it">Italian</option>
          </select>

          <div className="p-4 bg-gray-100 rounded text-lg">
            <strong>Translated Category Level 1:</strong> <br /> {getTranslated(1)}
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded text-lg">
            <strong>Translated Category Level 2:</strong> <br /> {getTranslated(2, [subCategory1])}
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded text-lg">
            <strong>Translated Category Level 3:</strong> <br /> {getTranslated(3, [subCategory1, subCategory2])}
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded text-lg">
            <strong>Translated Category Level 4:</strong> <br /> {getTranslated(4, [subCategory1, subCategory2, subCategory3])}
          </div>
        </div>
      </div>
    </div>
  );
}
