// Funciones de registro e inicio de sesión
document.getElementById('authForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = JSON.parse(localStorage.getItem(username));
  
  if (user && user.password === password) {
    localStorage.setItem('loggedUser', username);
    window.location.href = 'profile.html';
  } else if (!user) {
    localStorage.setItem(username, JSON.stringify({ password, balance: 0 }));
    localStorage.setItem('loggedUser', username);
    window.location.href = 'profile.html';
  } else {
    document.getElementById('authMessage').innerText = 'Contraseña incorrecta';
  }
});

// Funciones de perfil y sesión
function goToWallet() {
  window.location.href = 'wallet.html';
}

function logout() {
  localStorage.removeItem('loggedUser');
  window.location.href = 'index.html';
}

// Funciones de la billetera
function getLoggedUser() {
  return localStorage.getItem('loggedUser');
}

function updateBalanceDisplay() {
  const user = JSON.parse(localStorage.getItem(getLoggedUser()));
  document.getElementById('balance').innerText = user.balance;
}

function addBalance() {
  const user = JSON.parse(localStorage.getItem(getLoggedUser()));
  const amount = parseFloat(document.getElementById('amount').value);
  if (amount > 0) {
    user.balance += amount;
    localStorage.setItem(getLoggedUser(), JSON.stringify(user));
    updateBalanceDisplay();
    document.getElementById('walletMessage').innerText = 'Saldo agregado exitosamente';
  } else {
    document.getElementById('walletMessage').innerText = 'Ingresa una cantidad válida';
  }
}

function transferBalance() {
  const user = JSON.parse(localStorage.getItem(getLoggedUser()));
  const recipient = document.getElementById('recipient').value;
  const recipientUser = JSON.parse(localStorage.getItem(recipient));
  const amount = parseFloat(document.getElementById('amount').value);

  if (recipientUser && amount > 0 && user.balance >= amount) {
    // Crear la cuenta "ADMIN" si no existe
    let adminAccount = JSON.parse(localStorage.getItem("ADMIN"));
    if (!adminAccount) {
      adminAccount = { balance: 0 };
      localStorage.setItem("ADMIN", JSON.stringify(adminAccount));
    }

    // Calcular la comisión del 10%
    const commission = amount * 0.1;
    const transferAmount = amount - commission;

    // Actualizar el saldo del usuario que transfiere
    user.balance -= amount;

    // Actualizar el saldo del destinatario
    recipientUser.balance += transferAmount;

    // Agregar la comisión a la cuenta "ADMIN"
    adminAccount.balance += commission;

    // Guardar los cambios en localStorage
    localStorage.setItem(getLoggedUser(), JSON.stringify(user));
    localStorage.setItem(recipient, JSON.stringify(recipientUser));
    localStorage.setItem("ADMIN", JSON.stringify(adminAccount));

    updateBalanceDisplay();
    document.getElementById('walletMessage').innerText = 'Transferencia realizada con comisión del 10%';
  } else {
    document.getElementById('walletMessage').innerText = 'Error en la transferencia';
  }
}


// Llamar a updateBalanceDisplay al cargar la página de billetera
if (getLoggedUser() && window.location.pathname.includes('wallet.html')) {
  updateBalanceDisplay();
}