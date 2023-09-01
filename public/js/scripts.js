const searchForm = document.getElementById('bookSearchForm');
const searchResultsDiv = document.getElementById('searchResults');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;

    try {
        const response = await fetch(`/books/search?title=${title}&author=${author}&genre=${genre}`);
        const books = await response.json();

        displayResults(books);
    } catch (error) {
        console.error("Error fetching search results:", error);
        searchResultsDiv.innerHTML = '<p>Error fetching results.</p>';
    }
});

function displayResults(books) {
    if (books.length === 0) {
        searchResultsDiv.innerHTML = '<p>No books found.</p>';
        return;
    }

    let html = '<ul>';
    for (let book of books) {
        html += `
        <li>
            <strong>${book.title}</strong> by ${book.author}
            <p>${book.genre}</p>
        </li>
        `;
    }
    html += '</ul>';

    searchResultsDiv.innerHTML = html;
}
