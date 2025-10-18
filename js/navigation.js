// navigation.js - Manejo de navegación entre páginas

// Event listener para navegación
document.addEventListener('DOMContentLoaded', function () {
    setupNavigation();
});

// Configurar navegación
function setupNavigation() {
    // Esperar a que se cargue el nav
    setTimeout(() => {
        const navItems = document.querySelectorAll('nav ul li');
        navItems.forEach(item => {
            item.addEventListener('click', function () {
                const page = this.getAttribute('data-page');
                navigateToPage(page);
            });
        });

        // Logo navigation
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', function () {
                navigateToPage('index');
            });
        }
    }, 100);
}

// Navegar a una página
function navigateToPage(page) {
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');

    let targetPath = '';

    if (page === 'index') {
        targetPath = isInPagesFolder ? '../index.html' : 'index.html';
    } else {
        targetPath = isInPagesFolder ? `${page}.html` : `pages/${page}.html`;
    }

    window.location.href = targetPath;
}

// Renderizar problemas
function renderProblems() {
    const problemsList = document.getElementById('problems-list');
    if (!problemsList || !window.problemsData) return;

    problemsList.innerHTML = window.problemsData.map(problem => `
        <div class="card">
            <h3>${problem.title}</h3>
            <p>${problem.description}</p>
            <div class="card-meta">
                <span>👤 ${problem.author} (${problem.userType})</span>
                <span>💬 ${problem.answers} respuestas</span>
            </div>
        </div>
    `).join('');
}

// Renderizar grupos
function renderGroups() {
    const groupsList = document.getElementById('groups-list');
    if (!groupsList || !window.groupsData) return;

    groupsList.innerHTML = window.groupsData.map(group => `
        <div class="group-card">
            <div class="group-header">
                <div>
                    <h3>${group.name}</h3>
                    <span class="group-type type-${group.type}">${getGroupTypeLabel(group.type)}</span>
                </div>
                <button class="btn-primary" onclick="joinGroup('${group.id}')">Unirse</button>
            </div>
            <p>${group.description}</p>
            <div class="card-meta">
                <span>👥 ${group.members} miembros</span>
                <span>📚 ${group.projects} proyectos activos</span>
            </div>
        </div>
    `).join('');
}

// Renderizar proyectos
function renderProjects() {
    const projectsList = document.getElementById('projects-list');
    if (!projectsList || !window.projectsData) return;

    projectsList.innerHTML = window.projectsData.map(project => `
        <div class="card">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="card-meta">
                <span>👥 ${project.currentMembers}/${project.maxMembers} participantes</span>
                <span>🕐 ${getStatusLabel(project.status)}</span>
            </div>
        </div>
    `).join('');
}

// Renderizar comunidad
function renderCommunity() {
    const featuredMembers = document.getElementById('featured-members');
    if (!featuredMembers) return;

    const members = [
        { name: 'Prof. García', role: 'Docente de Programación', helped: 150, rating: 4.9, answers: 200 },
        { name: 'Carlos Méndez', role: 'Estudiante Universitario', helped: 85, rating: 4.7, answers: 85 },
        { name: 'Ana Torres', role: 'Estudiante Secundaria', helped: 45, rating: 4.6, answers: 50 }
    ];

    featuredMembers.innerHTML = members.map(member => `
        <div class="card">
            <h3>👨‍💻 ${member.name}</h3>
            <p>${member.role}</p>
            <div class="card-meta">
                <span>⭐ ${member.rating}/5.0</span>
                <span>💬 ${member.answers} respuestas</span>
            </div>
        </div>
    `).join('');
}

// Obtener etiqueta de estado
function getStatusLabel(status) {
    const labels = {
        'recruiting': 'Reclutando',
        'progress': 'En progreso',
        'completed': 'Completado'
    };
    return labels[status] || status;
}

// Funciones de filtrado
function filterByCategory(category) {
    console.log('Filtrar por categoría:', category);
    // Implementar filtrado
}

function filterByLevel(level) {
    console.log('Filtrar por nivel:', level);
    // Implementar filtrado
}

function filterByUserType(userType) {
    console.log('Filtrar por tipo de usuario:', userType);
    // Implementar filtrado
}

// Funciones de búsqueda
function searchProblems() {
    const searchTerm = document.getElementById('searchProblems').value.toLowerCase();
    if (!window.problemsData) return;

    const filtered = window.problemsData.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm) ||
        problem.description.toLowerCase().includes(searchTerm)
    );

    const problemsList = document.getElementById('problems-list');
    if (problemsList) {
        problemsList.innerHTML = filtered.map(problem => `
            <div class="card">
                <h3>${problem.title}</h3>
                <p>${problem.description}</p>
                <div class="card-meta">
                    <span>👤 ${problem.author} (${problem.userType})</span>
                    <span>💬 ${problem.answers} respuestas</span>
                </div>
            </div>
        `).join('');
    }
}

function searchGroups() {
    const searchTerm = document.getElementById('searchGroups').value.toLowerCase();
    if (!window.groupsData) return;

    const filtered = window.groupsData.filter(group =>
        group.name.toLowerCase().includes(searchTerm) ||
        group.description.toLowerCase().includes(searchTerm)
    );

    renderFilteredGroups(filtered);
}

function searchProjects() {
    const searchTerm = document.getElementById('searchProjects').value.toLowerCase();
    if (!window.projectsData) return;

    const filtered = window.projectsData.filter(project =>
        project.name.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
    );

    renderFilteredProjects(filtered);
}

// Funciones de ordenamiento
function sortProblems() {
    const sortBy = document.getElementById('sortProblems').value;
    if (!window.problemsData) return;

    let sorted = [...window.problemsData];

    if (sortBy === 'recent') {
        sorted.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'popular') {
        sorted.sort((a, b) => b.answers - a.answers);
    } else if (sortBy === 'unanswered') {
        sorted = sorted.filter(p => p.answers === 0);
    }

    const problemsList = document.getElementById('problems-list');
    if (problemsList) {
        problemsList.innerHTML = sorted.map(problem => `
            <div class="card">
                <h3>${problem.title}</h3>
                <p>${problem.description}</p>
                <div class="card-meta">
                    <span>👤 ${problem.author} (${problem.userType})</span>
                    <span>💬 ${problem.answers} respuestas</span>
                </div>
            </div>
        `).join('');
    }
}

function filterGroups() {
    const filterType = document.getElementById('filterGroupType').value;
    if (!window.groupsData) return;

    const filtered = filterType === 'all'
        ? window.groupsData
        : window.groupsData.filter(group => group.type === filterType);

    renderFilteredGroups(filtered);
}

function filterProjects() {
    const filterStatus = document.getElementById('filterProjectStatus').value;
    if (!window.projectsData) return;

    const filtered = filterStatus === 'all'
        ? window.projectsData
        : window.projectsData.filter(project => project.status === filterStatus);

    renderFilteredProjects(filtered);
}

// Renderizar grupos filtrados
function renderFilteredGroups(groups) {
    const groupsList = document.getElementById('groups-list');
    if (!groupsList) return;

    groupsList.innerHTML = groups.map(group => `
        <div class="group-card">
            <div class="group-header">
                <div>
                    <h3>${group.name}</h3>
                    <span class="group-type type-${group.type}">${getGroupTypeLabel(group.type)}</span>
                </div>
                <button class="btn-primary" onclick="joinGroup('${group.id}')">Unirse</button>
            </div>
            <p>${group.description}</p>
            <div class="card-meta">
                <span>👥 ${group.members} miembros</span>
                <span>📚 ${group.projects} proyectos activos</span>
            </div>
        </div>
    `).join('');
}

// Renderizar proyectos filtrados
function renderFilteredProjects(projects) {
    const projectsList = document.getElementById('projects-list');
    if (!projectsList) return;

    projectsList.innerHTML = projects.map(project => `
        <div class="card">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="card-meta">
                <span>👥 ${project.currentMembers}/${project.maxMembers} participantes</span>
                <span>🕐 ${getStatusLabel(project.status)}</span>
            </div>
        </div>
    `).join('');
}

// Unirse a un grupo
function joinGroup(groupId) {
    const user = getCurrentUser();
    if (!user) {
        alert('Debes iniciar sesión para unirte a un grupo');
        openModal('loginModal');
        return;
    }

    alert('Te has unido al grupo exitosamente!');
    // Aquí se implementaría la lógica para guardar la membresía
}