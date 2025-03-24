document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const monsterForm = document.getElementById("monster-form");
    const loadMoreBtn = document.getElementById("load-more");
  
    let page = 1;
    const limit = 50;
  
    // Fetch and Display Monsters
    function fetchMonsters(page) {
      fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
          monsters.forEach(renderMonster);
        });
    }
  
    function renderMonster(monster) {
      const monsterDiv = document.createElement("div");
      monsterDiv.classList.add("monster-card");
      monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <p>Age: ${monster.age.toFixed(2)}</p>
        <p>${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterDiv);
    }
  
    // Add New Monster
    monsterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = event.target.name.value;
      const age = parseFloat(event.target.age.value);
      const description = event.target.description.value;
  
      const newMonster = { name, age, description };
  
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newMonster)
      })
        .then(response => response.json())
        .then(monster => {
          renderMonster(monster);
          monsterForm.reset();
        });
    });
  
    // Load More Monsters
    loadMoreBtn.addEventListener("click", () => {
      page++;
      fetchMonsters(page);
    });
  
    // Initialize App
    fetchMonsters(page);
  });
  