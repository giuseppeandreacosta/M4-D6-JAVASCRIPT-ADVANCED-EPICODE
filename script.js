// Dichiarazione di due array vuoti
let userDetails = [];
let originalUserDetails = [];

// Funzione per ottenere i dettagli degli utenti da un'API
async function generateUserDetails() {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        userDetails = data.map(user => ({
            email: user.email,
            username: user.username,
            name: user.name
        }));
        originalUserDetails = [...userDetails];
    } catch (error) {
        console.error('Failed to fetch user details:', error);
    }
}

// Funzione per aggiornare la tabella con i dettagli degli utenti
function updateTable() {
    const tbody = document.querySelector('.table tbody');
    tbody.innerHTML = '';

    userDetails.forEach((user, index) => {
        const row = document.createElement('tr');

        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = index + 1;
        row.appendChild(th);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.username;
        row.appendChild(usernameCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = user.name;
        row.appendChild(nameCell);
        
        tbody.appendChild(row);
    });
}

// Funzione eseguita quando la pagina viene caricata
window.onload = async function() {
    await generateUserDetails();
    updateTable();

    const emailInput = document.querySelector('input[type="email"]');
    const usernameInput = document.querySelector('input[placeholder="Username"]');
    const nameInput = document.querySelector('input[placeholder="Name"]');
    
    [emailInput, usernameInput, nameInput].forEach(input => {
        input.addEventListener('input', function() {
            const searchValue = this.value.toLowerCase();

            if (searchValue) {
                userDetails = originalUserDetails.filter(user =>
                    user.email.toLowerCase().includes(searchValue) ||
                    user.username.toLowerCase().includes(searchValue) ||
                    user.name.toLowerCase().includes(searchValue)
                );
            } else {
                userDetails = [...originalUserDetails];
            }

            updateTable();
        });
    });
}
