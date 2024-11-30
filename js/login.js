document.addEventListener("DOMContentLoaded", () => {

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Get the token from the response
            } else {
                throw new Error('Invalid credentials');
            }
        })
        .then(data => {
            const token = data.token;
            localStorage.setItem('jwtToken', token);
            // Redirect to protected page
            window.location.href = '/index.html';
            console.log(localStorage.getItem('jwtToken'))
        })
        .catch(error => {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        });
    });
})

