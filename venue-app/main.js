import './style.css';

// Simulation Configuration
const crowdNodes = [
  { id: 'gate-n', x: '50%', y: '15%', density: 'high', label: 'N' },
  { id: 'gate-e', x: '85%', y: '50%', density: 'med', label: 'E' },
  { id: 'gate-s', x: '50%', y: '85%', density: 'low', label: 'S' },
  { id: 'gate-w', x: '15%', y: '50%', density: 'low', label: 'W' },
  { id: 'conc-1', x: '30%', y: '30%', density: 'high', label: '🍔' },
  { id: 'wc-1', x: '70%', y: '70%', density: 'med', label: 'WC' }
];

const mapOverlay = document.getElementById('mapOverlay');
const fullMapOverlay = document.getElementById('fullMapOverlay');
const refreshMapBtn = document.getElementById('refreshMap');
const liveAlert = document.getElementById('liveAlert');
const liveAlertText = document.querySelector('.live-alert-text');
const etaTime = document.getElementById('etaTime');
const merchCard = document.getElementById('merchCard');
const toastCard = document.getElementById('toastCard');
const pickupBtn = document.getElementById('pickupBtn');

// View Switching Logic
const navItems = document.querySelectorAll('.nav-item');
const viewPanels = document.querySelectorAll('.view-panel');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    // Nav styles
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');

    // Panel switching
    const targetId = item.getAttribute('data-target');
    viewPanels.forEach(panel => panel.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');

    // Header logic
    const subtitle = document.getElementById('headerSubtitle');
    if(targetId === 'view-tickets') {
        subtitle.innerText = 'Your Digital Pass';
    } else if (targetId === 'view-profile') {
        subtitle.innerText = 'Account & Settings';
    } else if (targetId === 'view-map') {
        subtitle.innerText = 'Interactive Venue Map';
    } else {
        subtitle.innerText = 'Section 114 • Row G • Seat 12';
    }
  });
});


// Map Render Logic
function renderNodes(nodes, container) {
  if(!container) return;
  container.innerHTML = '';
  nodes.forEach(node => {
    const el = document.createElement('div');
    el.className = `crowd-node density-${node.density}`;
    el.style.left = node.x;
    el.style.top = node.y;
    el.innerText = node.label;
    container.appendChild(el);
  });
}

function updateMaps(nodes) {
    renderNodes(nodes, mapOverlay);
    renderNodes(nodes, fullMapOverlay);
}

updateMaps(crowdNodes);

// Simulate map refresh action
if(refreshMapBtn) {
    refreshMapBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    refreshMapBtn.style.transform = 'rotate(180deg)';
    setTimeout(() => refreshMapBtn.style.transform = 'rotate(0deg)', 300);
    
    const updatedNodes = crowdNodes.map(node => {
        const densities = ['low', 'med', 'high'];
        return { ...node, density: densities[Math.floor(Math.random() * densities.length)] };
    });
    
    updateMaps(updatedNodes);
    
    toastCard.querySelector('h4').innerText = 'Map Refreshed';
    toastCard.querySelector('p').innerText = 'Crowd density data updated from area sensors.';
    showToast();
    });
}

// Mini map click redirects to full map
const miniMapTrigger = document.getElementById('miniMapTrigger');
if(miniMapTrigger) {
    miniMapTrigger.addEventListener('click', () => {
        document.querySelector('.nav-item[data-target="view-map"]').click();
    });
}

// Simulate ETA countdown
let minutesLeft = 8;
const timer = setInterval(() => {
  minutesLeft -= 1;
  if(minutesLeft > 0) {
    if(etaTime) etaTime.innerText = `${minutesLeft} min`;
  } else {
    if(etaTime) {
        etaTime.innerText = 'Ready!';
        etaTime.style.color = 'var(--accent-green)';
    }
    const qStatus = document.querySelector('.queue-status');
    if(qStatus) {
        qStatus.innerText = 'Awaiting Pickup';
        qStatus.style.background = 'rgba(0, 230, 118, 0.1)';
        qStatus.style.color = 'var(--accent-green)';
    }
    if(pickupBtn) {
        pickupBtn.innerText = 'Pick Up Now';
        pickupBtn.style.background = 'var(--accent-green)';
    }
    clearInterval(timer);
    
    // Broadcast ready alert
    if(liveAlertText) liveAlertText.innerText = '🍟 Your order at Burger Stadium Grill is ready for pickup!';
  }
}, 5000);

// Toast notification function
function showToast() {
  toastCard.classList.add('show');
  setTimeout(() => {
    toastCard.classList.remove('show');
  }, 4000);
}

if(merchCard) {
    merchCard.addEventListener('click', () => {
    toastCard.querySelector('h4').innerText = 'Merch Drop Alert!';
    toastCard.querySelector('p').innerText = 'Exclusive team jersey dropped at North Store. ETA 2 min walk.';
    showToast();
    });
}

if(pickupBtn) {
    pickupBtn.addEventListener('click', () => {
    if (minutesLeft <= 0) {
        alert('Displaying Pick-up QR Code (Simulation)');
    } else {
        alert('Please wait ' + minutesLeft + ' minutes before showing your QR code.');
    }
    });
}

// AI Chatbot - Google Gemini Integration
import { fetchGeminiResponse } from './src/api/gemini.js';
import { sanitizeInput } from './tests/logic.test.js';

const aiFab = document.getElementById('aiFab');
const aiChat = document.getElementById('aiChat');
const aiClose = document.getElementById('aiClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatBody = document.getElementById('chatBody');

if(aiFab) {
    aiFab.addEventListener('click', () => aiChat.classList.add('open'));
    aiClose.addEventListener('click', () => aiChat.classList.remove('open'));

    const addMessage = (text, sender) => {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${sender}`;
        msg.innerText = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleChat = async () => {
        const rawVal = chatInput.value;
        if(!rawVal.trim()) return;
        
        const cleanVal = sanitizeInput(rawVal);
        addMessage(cleanVal, 'user');
        chatInput.value = '';

        // Loader
        const loader = document.createElement('div');
        loader.className = 'chat-msg bot';
        loader.innerText = '🤔 thinking...';
        chatBody.appendChild(loader);

        // Fetch Real Gemini Response (or robust fallback)
        const response = await fetchGeminiResponse(cleanVal);
        
        chatBody.removeChild(loader);
        addMessage(response, 'bot');
    };

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => { 
        if(e.key === 'Enter') handleChat(); 
    });
}

// Register PWA Service Worker for Efficiency Points
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('SW registration failed: ', err);
    });
  });
}
