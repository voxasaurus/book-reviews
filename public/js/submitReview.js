document.getElementById("submitReviewForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const bookTitle = document.getElementById("bookTitle").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const reviewContent = document.getElementById("reviewContent").value;
    const rating = document.getElementById("rating").value;

    try {
        const response = await fetch("/reviews/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: bookTitle,
                author: bookAuthor,
                review: reviewContent,
                rating
            })
        });

        const result = await response.json();
        if (response.status === 200) {
            alert("Review submitted successfully.");
            window.location.href = "reviews.html"; // Redirect to the reviews page or any other appropriate page
        } else {
            alert("Error submitting review: " + result.message);
        }
    } catch (error) {
        console.error("Error submitting review:", error);
    }
});
