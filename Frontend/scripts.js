const API_URL = "http://localhost:5000/api/clothes";

async function fetchClothes() {
    let response = await fetch(API_URL);
    let data = await response.json();
    renderClothes(data);
}

async function addClothing() {
    let name = document.getElementById("clothingName").value;
    let category = document.getElementById("clothingCategory").value;

    let response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category })
    });

    if (response.ok) fetchClothes();
}

async function deleteClothing(id) {
    let response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (response.ok) fetchClothes();
}

async function editClothing(id, oldName, oldCategory) {
    let name = prompt("New name:", oldName);
    let category = prompt("New category:", oldCategory);

    if (name && category) {
        let response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, category })
        });

        if (response.ok) fetchClothes();
    }
}

function renderClothes(clothes) {
    let list = document.getElementById("clothingList");
    list.innerHTML = "";
    
    clothes.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.name}</strong> (${item.category})
            <button onclick="editClothing(${item.id}, '${item.name}', '${item.category}')">✏️ Edit</button>
            <button onclick="deleteClothing(${item.id})">❌ Delete</button>
        `;
        list.appendChild(li);
    });
}

// Load data when the page loads
fetchClothes();
