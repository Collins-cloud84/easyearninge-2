let userBalance = 670; // Example starting balance. In a real app, fetch this dynamically.
const isAdmin = false; // Set to true to simulate admin view.

let withdrawals = []; // Each: { amount, fee, net, status, date }

function updateBalance() {
  document.getElementById('withdrawBalance').textContent = `KES ${userBalance}`;
}

function handleWithdraw(e) {
  e.preventDefault();
  const amount = parseInt(document.getElementById('withdrawAmount').value);
  const msg = document.getElementById('withdrawMsg');

  if (isNaN(amount) || amount < 150) {
    msg.textContent = 'Minimum withdrawal is 150 KES.';
    return false;
  }
  if (amount > userBalance) {
    msg.textContent = 'Insufficient balance!';
    return false;
  }

  const fee = Math.round(amount * 0.10);
  const net = amount - fee;
  const now = new Date().toLocaleString();

  withdrawals.unshift({
    amount, fee, net,
    status: 'pending',
    date: now
  });

  userBalance -= amount;
  updateBalance();
  renderWithdrawals();
  msg.textContent = `Withdrawal of KES ${amount} requested. 10% fee deducted.`;
  document.getElementById('withdrawAmount').value = '';
  return false;
}

function renderWithdrawals() {
  const tbody = document.getElementById('withdrawHistory');
  tbody.innerHTML = '';
  withdrawals.forEach((w, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>KES ${w.amount}</td>
      <td>KES ${w.fee}</td>
      <td>KES ${w.net}</td>
      <td class="status-${w.status}">${w.status.charAt(0).toUpperCase() + w.status.slice(1)}</td>
      <td>${w.date}</td>
      <td>${
        isAdmin && w.status === 'pending' 
        ? `<button class="admin-action-btn" onclick="markPaid(${idx})">Mark Paid</button>`
        : '-'
      }</td>
    `;
    tbody.appendChild(tr);
  });
}

// Admin only: Mark withdrawal as paid
function markPaid(idx) {
  if (withdrawals[idx] && withdrawals[idx].status === 'pending') {
    withdrawals[idx].status = 'paid';
    renderWithdrawals();
  }
}

window.onload = function() {
  updateBalance();
  renderWithdrawals();
}