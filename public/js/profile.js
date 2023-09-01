/// Fetch the user's profile data from the backend
async function fetchProfileData() {
    try {
        const response = await fetch("/users/profile"); // Ensure you've set up this endpoint on your server
        const data = await response.json();
        if (response.status === 200) {
            document.getElementById("username").innerText = data.username;
            document.getElementById("email").innerText = data.email;

            // Let's assume data.reviews is an array of the user's reviews
            const reviewList = document.getElementById("reviewList");
            data.reviews.forEach(review => {
                const listItem = document.createElement("li");
                listItem.innerText = review;
                reviewList.appendChild(listItem);
            });
        } else {
            alert("Failed to load profile data.");
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
}

// Listen for the edit profile button click
document.getElementById("editProfileBtn").addEventListener("click", () => {
    // Redirect to the profile edit page or open a modal for editing
    window.location.href = "editProfile.html";
});

// Call the function to fetch profile data when the page loads
fetchProfileData();
