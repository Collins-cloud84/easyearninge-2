// Simulate user data for demo purposes
let username = "johnDoe";
let balance = 0;
let mediaEarned = 0;
let level1Earned = 0;
let level2Earned = 0;

// For graph, simulate daily earnings
let dailyEarnings = [0, 0, 0, 0, 0, 0, 0];
let days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

document.getElementById('dashUsername').textContent = username;
document.getElementById('referralLink').value = `https://easyearni-e2.com/register?ref=${username}`;

function updateDashboard() {
  document.getElementById('balance').textContent = `KES ${balance}`;
  document.getElementById('mediaEarnings').textContent = `KES ${mediaEarned}`;
  document.getElementById('level1Earnings').textContent = `KES ${level1Earned}`;
  document.getElementById('level2Earnings').textContent = `KES ${level2Earned}`;
}
updateDashboard();

// Earnings logic
function earnMedia() {
  mediaEarned += 5;
  balance += 5;
  dailyEarnings[new Date().getDay()] += 5;
  updateDashboard();
  updateGraph();
}

function addReferral(level) {
  if(level === 1) {
    level1Earned += 100;
    balance += 100;
    dailyEarnings[new Date().getDay()] += 100;
  } else {
    level2Earned += 50;
    balance += 50;
    dailyEarnings[new Date().getDay()] += 50;
  }
  updateDashboard();
  updateGraph();
}

function copyReferralLink() {
  let refInput = document.getElementById('referralLink');
  refInput.select();
  refInput.setSelectionRange(0, 99999);
  document.execCommand('copy');
  alert('Referral link copied!');
}

// Chart.js graph
let ctx = document.getElementById('progressChart').getContext('2d');
let progressChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: days,
    datasets: [{
      label: 'KES Earned Per Day',
      data: dailyEarnings,
      borderColor: '#B65CC4',
      backgroundColor: 'rgba(182, 92, 196, 0.15)',
      tension: 0.3,
      fill: true,
      pointBackgroundColor: '#5CC4B6',
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function updateGraph() {
  progressChart.data.datasets[0].data = dailyEarnings;
  progressChart.update();
}