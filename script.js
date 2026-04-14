const form = document.getElementById("searchForm");
const input = document.getElementById("wordInput");
const result = document.getElementById("result");
const errorDiv = document.getElementById("error");

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const word = input.value.trim();

    result.innerHTML = "";
    errorDiv.textContent = "";

    try {
        const response = await fetch(API_URL + word);

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const data = await response.json();
        displayWord(data[0]);

    } catch (error) {
        errorDiv.textContent = "❌ Word not found. Try another one.";
    }
});

function displayWord(data) {
    const meaning = data.meanings[0];

    result.innerHTML = `
        <h2>${data.word}</h2>
        <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
        <p><strong>Definition:</strong> ${meaning.definitions[0].definition}</p>
        <p><strong>Example:</strong> ${meaning.definitions[0].example || "No example available"}</p>
    `;
}