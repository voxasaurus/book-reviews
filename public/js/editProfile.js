// Prefill form with existing data
async function fetchProfileDataForEdit() {
    try {
        const response = await fetch("/users/profile"); // Make sure to have this endpoint on your server
        const data = await response.json();
        if (response.status === 200) {
            document.getElementById("editUsername").value = data.username;
            document.getElementById("editEmail").value = data.email;
        } else {
            alert("Failed to load profile data for editing.");
        }
    } catch (error) {
        console.error("Error fetching profile for edit:", error);
    }
}

// Listen for form submission to update profile
document.getElementById("editProfileForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("editUsername").value;
    const email = document.getElementById("editEmail").value;
    const password = document.getElementById("editPassword").value;

    const updateData = {
        username,
        email
    };

    if (password) { // Only add password to the update data if it's provided
        updateData.password = password;
    }

    try {
        const response = await fetch("/users/updateProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateData)
        });

        const result = await response.json();
        if (response.status === 200) {
            alert("Profile updated successfully.");
            window.location.href = "profile.html"; // Redirect to the profile page after successful update
        } else {
            alert("Error updating profile: " + result.message);
        }
    } catch (error) {
        console.error("Error updating profile:", error);
    }
});

// Call the function to prefill form data when the page loads
fetchProfileDataForEdit();
