import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const display = categories.filter((categorie) =>
    categorie.toLowerCase().includes(filter)
  );

  async function fetchData() {
    let result = 0;

    await fetch("https://api.publicapis.org/categories")
      .then((res) => res.json())
      .then((response) => {
        result = response.categories;
      });

    setCategories(result);
    return result;
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="Container">
        <span>Filter: </span>
        <input
          type="text"
          defaultValue={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table>
        <tbody>
          {display.map((categorie, index) => {
            return (
              <tr key={`${categorie}-${index}`}>
                <td>{categorie}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
