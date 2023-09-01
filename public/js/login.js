document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = {
        email,
        password
    };

    try {
        const response = await fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.status === 200) {
            // Storing token for authenticated requests (use a more secure method in production)
            localStorage.setItem("userToken", data.token);
            location.href = "/profile.html"; // Redirect to profile page
        } else {
            alert(data.message); // Display error message from server
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred. Please try again later.");
    }
});
