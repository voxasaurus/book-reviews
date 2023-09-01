document.getElementById("registrationForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    // Call your backend API to register the user
    const response = await fetch("/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password,
            email
        })
    });

    const data = await response.json();

    if (response.status === 200) {
        alert("Registered successfully!");
        // Redirect to login or another page
        window.location.href = "login.html";
    } else {
        alert(`Error: ${data.message}`);
    }
});
