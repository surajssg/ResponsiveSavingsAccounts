let currentAccountIndex = 0;
let accountsData = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json').then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        accountsData = data;
        displayDesktopTable(accountsData);
        displayMobileView(currentAccountIndex);
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});

function displayDesktopTable(accounts) {
    const table = document.getElementById('accountsTable');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Product</th>
                <th>Interest Rate</th>
                <th>Minimum Deposit</th>
                <th>Interest Type</th>
            </tr>
        </thead>
        <tbody>
            ${accounts.map(account => `
                <tr>
                    <td>${account.product}</td>
                    <td>${account.interestRate}</td>
                    <td>${account.minimumDeposit}</td>
                    <td>${account.interestType}</td>
                </tr>
            `).join('')}
        </tbody>`;
    table.style.display = window.innerWidth >= 600 ? 'table' : 'none';
}

function displayMobileView(index) {
    const account = accountsData[index];
    const accountDetails = document.getElementById('accountDetails');
    accountDetails.innerHTML = `
        <div>
            <h2>${account.product}</h2>
            <p>Interest Rate: ${account.interestRate}</p>
            <p>Minimum Deposit: ${account.minimumDeposit}</p>
            <p>Interest Type: ${account.interestType}</p>
        </div>`;
    accountDetails.style.display = window.innerWidth < 600 ? 'block' : 'none';
    updateNavigationButtons(index);
}

function updateNavigationButtons(index) {
    const prevAccount = document.getElementById('prevAccount');
    const nextAccount = document.getElementById('nextAccount');
    prevAccount.textContent = `<< ${accountsData[(index + accountsData.length - 1) % accountsData.length].product}`;
    nextAccount.textContent`... ${accountsData[(index + 1) % accountsData.length].product} >>`;
}

// Event listeners for the navigation buttons
document.getElementById('prevAccount').addEventListener('click', () => {
    currentAccountIndex = (currentAccountIndex + accountsData.length - 1) % accountsData.length;
    displayMobileView(currentAccountIndex);
});

document.getElementById('nextAccount').addEventListener('click', () => {
    currentAccountIndex = (currentAccountIndex + 1) % accountsData.length;
    displayMobileView(currentAccountIndex);
});

// Call this function to initially hide or show the table and mobile view depending on the screen width
function adjustViewForScreenSize() {
    displayDesktopTable(accountsData);
    displayMobileView(currentAccountIndex);
}

// Add a resize event listener to adjust the view when the window size changes
window.addEventListener('resize', adjustViewForScreenSize);

// Initial call to adjust the view based on the current screen size
adjustViewForScreenSize();
