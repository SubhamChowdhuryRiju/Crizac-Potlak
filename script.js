const menuItems = [
    { id: 1, name: "Subham", food: "Chicken Momo", img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=400&q=80", status: "Not Started", progress: 0 },
    { id: 2, name: "Indra", food: "Veg Noodles", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdh-JpQtxJcT7Q8SOYN7vNZeqQKUScE1HF8Q&s", status: "Not Started", progress: 0 },
    { id: 3, name: "Meghaa", food: "Chilli Chicken", img: "https://images.slurrp.com/prod/recipe_images/transcribe/side%20dish/Chilli_Chicken.webp?impolicy=slurrp-20210601&width=1200&height=900&q=75", status: "Not Started", progress: 0 },
    { id: 4, name: "Anita", food: "Kerala fish fry", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg_jkRBlV-TQjXn56fggbgbgi4_j9H2kNmcQ&s", status: "Not Started", progress: 0 },
    { id: 5, name: "Piyo", food: "Lemon Rice", img: "https://feelgoodfoodie.net/wp-content/uploads/2025/02/Lemon-Rice-11-500x500.jpg", status: "Not Started", progress: 0 },
    { id: 6, name: "Piyo", food: "Butter Garlic Chicken", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8OA8O1QXEuifRujq6Ne1ZwcnHpGtNzWkRNw&s", status: "Not Started", progress: 0 },
    { id: 7, name: "Raju", food: "Porota", img: "https://c.ndtvimg.com/2023-01/qhqiliag_parotta_625x300_13_January_23.jpg", status: "Not Started", progress: 0 },
    { id: 8, name: "Sumit", food: "Paneer pasinda", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJPMwlYFmyufXgFJdV9M59XGJtU3ZUxJ2ZlQ&s", status: "Not Started", progress: 0 },
    { id: 9, name: "Siddhant", food: "Cold drink", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80", status: "Not Started", progress: 0 },
    { id: 10, name: "Sandip", food: "Sechuwan rice", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80", status: "Not Started", progress: 0 },
    { id: 11, name: "Satyaki", food: "Sweets", img: "https://www.eg2i.com/uploads/product_image/product_795_1.jpg", status: "Not Started", progress: 0 },
    { id: 12, name: "Subham 2", food: "Chicken Bharta", img: "https://lh6.googleusercontent.com/proxy/_CmUwwtNoUn7QUHKbE_rFGeWaLIFgK_z_NYK7UBsITh34_Z75fgcNZoQbnu6au8tppvEWVt_7W9up0v-YilQ0J60PY7q9WE", status: "Not Started", progress: 0 },
    { id: 13, name: "Priyanka", food: "Chowmein Singara", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80", status: "Not Started", progress: 0 },
    { id: 14, name: "Sourav", food: "Baby corn", img: "https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/sanjeev-kapoor/media/media_files/VLIL6LHbVEBUHhmwI3IW.jpg", status: "Not Started", progress: 0 },
    { id: 15, name: "Trisha", food: "Mixed fried rice", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv2Tg1aXhldO7f1HZntOYC-Tx8FDDs8H51Hw&s", status: "Not Started", progress: 0 },
    { id: 16, name: "Kunal", food: "Chatni and Papad", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHaFdia1xYoCWcN9tbNhTVNY-BWkw9c8Cq8g&s", status: "Not Started", progress: 0 },
    { id: 17, name: "Kusum", food: "Special Aloo dom", img: "https://lh6.googleusercontent.com/proxy/eERvFKLqJpRqGZE5xTotdBhK-yS090R6B4aVtoXslyI1nFrfDoPSZeXfnDxlaHbSJ9SXukbOm-6mOpQdLznOyTEtUAzOdrnMBHo", status: "Not Started", progress: 0 },
    { id: 18, name: "Sibendu Da", food: "Kalakand", img: "https://www.nestleprofessional.in/sites/default/files/2022-07/Kalakand-420x330.webp", status: "Not Started", progress: 0 }
];
const menuGrid = document.getElementById('menu-grid');
const teamGrid = document.getElementById('team-grid');
const galleryGrid = document.getElementById('gallery-grid');

const viewEvents = document.getElementById('view-events');
const viewTeam = document.getElementById('view-team');
const viewGallery = document.getElementById('view-gallery');

const navEvents = document.getElementById('nav-events');
const navTeam = document.getElementById('nav-team');
const navGallery = document.getElementById('nav-gallery');

const modal = document.getElementById('progress-modal');
const closeBtn = document.querySelector('.close-btn');
const saveBtn = document.getElementById('save-progress');
const modalTitle = document.getElementById('modal-title');
const modalFood = document.getElementById('modal-food');
const progressStatusInput = document.getElementById('progress-status');
const progressPercentageInput = document.getElementById('progress-percentage');
const progressPercentageVal = document.getElementById('progress-percentage-val');

let currentEditingId = null;

// Initialize data from backend API
async function loadData() {
    try {
        const res = await fetch('/api/progress');
        if (res.ok) {
            const json = await res.json();
            const data = json.data || [];
            
            menuItems.forEach(item => {
                const savedItem = data.find(d => d.id === item.id);
                if (savedItem) {
                    item.status = savedItem.status;
                    item.progress = savedItem.progress;
                }
            });
            
            // Re-render the UI after data is loaded
            renderGrid();
            renderTeamGrid();
            renderGalleryGrid();
        } else {
            console.error('Failed to load data:', await res.text());
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function saveData(item) {
    try {
        const res = await fetch('/api/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: item.id,
                status: item.status,
                progress: item.progress
            })
        });
        
        if (!res.ok) {
            console.error('Failed to save data:', await res.text());
            alert("Failed to save data. Please try again.");
        }
    } catch (error) {
        console.error('Error saving data:', error);
        alert("Failed to save data. Please try again.");
    }
}

function getStatusClass(status) {
    switch (status) {
        case 'Shopping Done': return 'status-shopping';
        case 'Preparing': return 'status-preparing';
        case 'Cooking': return 'status-cooking';
        case 'Ready': return 'status-ready';
        default: return 'status-not-started';
    }
}

function renderGrid() {
    menuGrid.innerHTML = '';
    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.food}" class="card-image">
            <div class="card-body">
                <div class="card-header">
                    <div class="food-name">${item.food}</div>
                    <div class="participant-name">${item.name}</div>
                </div>
                <div class="progress-section">
                    <div class="status-header">
                        <span class="status-badge ${getStatusClass(item.status)}">${item.status}</span>
                        <span class="progress-text">${item.progress}% Complete</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${item.progress}%"></div>
                    </div>
                </div>
                <button class="update-btn" onclick="openModal(${item.id})">Update Status</button>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

function renderTeamGrid() {
    teamGrid.innerHTML = '';
    // Extract unique members
    const members = [...new Set(menuItems.map(item => item.name))];
    members.forEach(member => {
        const memberItems = menuItems.filter(i => i.name === member).map(i => i.food).join(', ');
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <div class="team-avatar">🧑‍💼</div>
            <div class="team-name">${member}</div>
            <div class="team-role">Bringing: ${memberItems}</div>
        `;
        teamGrid.appendChild(card);
    });
}

function renderGalleryGrid() {
    galleryGrid.innerHTML = '';
    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.food}" class="card-image">
            <div class="card-body">
                <div class="card-header" style="border: none; padding-bottom: 0;">
                    <div class="food-name" style="text-align: center; margin: 0;">${item.food}</div>
                </div>
            </div>
        `;
        galleryGrid.appendChild(card);
    });
}

function switchTab(tabId) {
    // Hide all views
    viewEvents.style.display = 'none';
    viewTeam.style.display = 'none';
    viewGallery.style.display = 'none';
    
    // Remove active class
    navEvents.classList.remove('active');
    navTeam.classList.remove('active');
    navGallery.classList.remove('active');
    
    if (tabId === 'events') {
        viewEvents.style.display = 'block';
        navEvents.classList.add('active');
    } else if (tabId === 'team') {
        viewTeam.style.display = 'block';
        navTeam.classList.add('active');
    } else if (tabId === 'gallery') {
        viewGallery.style.display = 'block';
        navGallery.classList.add('active');
    }
}

navEvents.addEventListener('click', () => switchTab('events'));
navTeam.addEventListener('click', () => switchTab('team'));
navGallery.addEventListener('click', () => switchTab('gallery'));

function openModal(id) {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;

    currentEditingId = id;
    modalTitle.textContent = `Update: ${item.name}`;
    modalFood.textContent = `Food: ${item.food}`;
    progressStatusInput.value = item.status;
    progressPercentageInput.value = item.progress;
    progressPercentageVal.textContent = `${item.progress}%`;

    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
    currentEditingId = null;
}

// Event Listeners
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

progressPercentageInput.addEventListener('input', (e) => {
    progressPercentageVal.textContent = `${e.target.value}%`;

    // Auto-update status based on slider if they haven't explicitly chosen ready
    const val = parseInt(e.target.value);
    if (val === 0) progressStatusInput.value = 'Not Started';
    else if (val > 0 && val < 25) progressStatusInput.value = 'Shopping Done';
    else if (val >= 25 && val < 60) progressStatusInput.value = 'Preparing';
    else if (val >= 60 && val < 100) progressStatusInput.value = 'Cooking';
    else if (val === 100) progressStatusInput.value = 'Ready';
});

progressStatusInput.addEventListener('change', (e) => {
    const status = e.target.value;
    if (status === 'Not Started') progressPercentageInput.value = 0;
    else if (status === 'Shopping Done' && progressPercentageInput.value < 10) progressPercentageInput.value = 25;
    else if (status === 'Preparing' && progressPercentageInput.value < 25) progressPercentageInput.value = 50;
    else if (status === 'Cooking' && progressPercentageInput.value < 60) progressPercentageInput.value = 75;
    else if (status === 'Ready') progressPercentageInput.value = 100;

    progressPercentageVal.textContent = `${progressPercentageInput.value}%`;
});

saveBtn.addEventListener('click', async () => {
    if (currentEditingId === null) return;

    const itemIndex = menuItems.findIndex(i => i.id === currentEditingId);
    if (itemIndex > -1) {
        const item = menuItems[itemIndex];
        
        // Optimistic UI update
        item.status = progressStatusInput.value;
        item.progress = parseInt(progressPercentageInput.value);
        
        renderGrid();
        renderTeamGrid();
        renderGalleryGrid();
        closeModal();
        
        // Save to backend
        await saveData(item);
    }
});

// Init - render initially with default state, then load from backend
renderGrid();
renderTeamGrid();
renderGalleryGrid();
loadData();
