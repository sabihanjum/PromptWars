import Chart from 'chart.js/auto';
import './admin.css';

// Map Simulation for Admin
const crowdNodes = [
  { id: 'n', x: '50%', y: '15%', density: 'high', label: 'N' },
  { id: 'e', x: '85%', y: '50%', density: 'med', label: 'E' },
  { id: 's', x: '50%', y: '85%', density: 'low', label: 'S' },
  { id: 'w', x: '15%', y: '50%', density: 'low', label: 'W' },
  { id: 'c1', x: '30%', y: '30%', density: 'high', label: '🍔' },
  { id: 'wc1', x: '70%', y: '70%', density: 'med', label: 'WC' },
  { id: 'c2', x: '60%', y: '35%', density: 'low', label: '🍔' }
];

const adminMapOverlay = document.getElementById('adminMapOverlay');
function renderAdminNodes(nodes) {
  adminMapOverlay.innerHTML = '';
  nodes.forEach(node => {
    const el = document.createElement('div');
    el.className = `admin-node node-${node.density}`;
    el.style.left = node.x;
    el.style.top = node.y;
    el.innerText = node.label;
    adminMapOverlay.appendChild(el);
  });
}
renderAdminNodes(crowdNodes);

// Chart.js Setup
const ctx = document.getElementById('queueChart').getContext('2d');
Chart.defaults.color = '#8c96ae';
Chart.defaults.font.family = 'Outfit';

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['1:00', '1:10', '1:20', '1:30', '1:40', '1:50', '2:00'],
        datasets: [{
            label: 'Burger Grill',
            data: [5, 9, 15, 22, 18, 12, 8],
            borderColor: '#00e5ff',
            backgroundColor: 'rgba(0, 229, 255, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        },
        {
            label: 'North Bar',
            data: [12, 15, 20, 28, 25, 20, 15],
            borderColor: '#b338ff',
            backgroundColor: 'rgba(179, 56, 255, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255, 255, 255, 0.05)' }
            },
            x: {
                grid: { display: false }
            }
        }
    }
});

// Broadcast Modal Logic
const alertModal = document.getElementById('alertModal');
const broadcastAlertBtn = document.getElementById('broadcastAlertBtn');
const cancelModal = document.getElementById('cancelModal');
const sendAlertBtn = document.getElementById('sendAlert');

broadcastAlertBtn.addEventListener('click', () => {
    alertModal.classList.add('active');
});

cancelModal.addEventListener('click', () => {
    alertModal.classList.remove('active');
});

sendAlertBtn.addEventListener('click', () => {
    sendAlertBtn.innerText = 'Sending...';
    setTimeout(() => {
        alertModal.classList.remove('active');
        sendAlertBtn.innerText = 'Send Broadcast Alert';
        alert('Push alert dispatched successfully to attendees in the selected zone.');
    }, 1000);
});
