// main.js - Archivo principal para cargar datos y componentes

// Cargar componentes al inicio
document.addEventListener('DOMContentLoaded', async function () {
    await loadComponents();
    await loadData();
    checkAuthStatus();
});

// Función para cargar componentes HTML
async function loadComponents() {
    const componentsPath = window.location.pathname.includes('/pages/') ? '../components/' : 'components/';

    // Cargar Header
    try {
        const headerResponse = await fetch(componentsPath + 'header.html');
        const headerHTML = await headerResponse.text();
        document.getElementById('header-container').innerHTML = headerHTML;
    } catch (error) {
        console.error('Error cargando header:', error);
    }

    // Cargar Sidebar
    try {
        const sidebarResponse = await fetch(componentsPath + 'sidebar.html');
        const sidebarHTML = await sidebarResponse.text();
        document.getElementById('sidebar-container').innerHTML = sidebarHTML;
    } catch (error) {
        console.error('Error cargando sidebar:', error);
    }

    // Cargar Footer
    try {
        const footerResponse = await fetch(componentsPath + 'footer.html');
        const footerHTML = await footerResponse.text();
        document.getElementById('footer-container').innerHTML = footerHTML;
    } catch (error) {
        console.error('Error cargando footer:', error);
    }

    // Cargar Modals
    loadModals();
}

// Función para cargar los modals
function loadModals() {
    const modalsHTML = `
        <!-- Register Modal -->
        <div id="registerModal" class="modal">
            <div class="modal-content">
                <span class="close-modal" onclick="closeModal('registerModal')">&times;</span>
                <h2>Crear Cuenta</h2>
                <form onsubmit="handleRegister(event)">
                    <div class="form-group">
                        <label>Nombre Completo</label>
                        <input type="text" id="regName" required>
                    </div>
                    <div class="form-group">
                        <label>Tipo de Usuario</label>
                        <select id="regType" onchange="updateRegisterForm()" required>
                            <option value="">Selecciona...</option>
                            <option value="student-high">Estudiante Secundaria</option>
                            <option value="student-uni">Estudiante Universitario</option>
                            <option value="teacher">Docente</option>
                        </select>
                    </div>
                    <div class="form-group" id="schoolGroup" style="display:none;">
                        <label>Institución Educativa</label>
                        <input type="text" id="regSchool">
                    </div>
                    <div class="form-group" id="codeGroup" style="display:none;">
                        <label>Código Estudiantil</label>
                        <input type="text" id="regCode">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="regEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" id="regPassword" required>
                    </div>
                    <button type="submit" class="btn-primary">Crear Cuenta</button>
                </form>
            </div>
        </div>

        <!-- Login Modal -->
        <div id="loginModal" class="modal">
            <div class="modal-content">
                <span class="close-modal" onclick="closeModal('loginModal')">&times;</span>
                <h2>Iniciar Sesión</h2>
                <form onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label>Institución Educativa</label>
                        <input type="text" id="loginSchool" required>
                    </div>
                    <div class="form-group">
                        <label>Código Estudiantil</label>
                        <input type="text" id="loginCode" required>
                    </div>
                    <div class="form-group">
                        <label>Nombre</label>
                        <input type="text" id="loginName" required>
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" id="loginPassword" required>
                    </div>
                    <button type="submit" class="btn-primary">Iniciar Sesión</button>
                    <button type="button" class="btn-secondary" onclick="closeModal('loginModal'); openModal('registerModal')">¿No tienes cuenta? Regístrate</button>
                </form>
            </div>
        </div>

        <!-- Create Group Modal -->
        <div id="createGroupModal" class="modal">
            <div class="modal-content">
                <span class="close-modal" onclick="closeModal('createGroupModal')">&times;</span>
                <h2>Crear Nuevo Grupo</h2>
                <form onsubmit="handleCreateGroup(event)">
                    <div class="form-group">
                        <label>Nombre del Grupo</label>
                        <input type="text" id="groupName" required>
                    </div>
                    <div class="form-group">
                        <label>Tipo de Grupo</label>
                        <select id="groupType" required>
                            <option value="">Selecciona...</option>
                            <option value="university">Solo Universitarios</option>
                            <option value="highschool">Solo Secundaria</option>
                            <option value="mixed">Universitarios y Secundaria</option>
                            <option value="teacher">Solo Docentes</option>
                            <option value="mixed-all">Estudiantes y Docentes</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Descripción</label>
                        <textarea id="groupDescription" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Lenguaje de Programación</label>
                        <select id="groupLanguage" required>
                            <option value="">Selecciona...</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="sql">SQL</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary">Crear Grupo</button>
                </form>
            </div>
        </div>

        <!-- Create Problem Modal -->
        <div id="createProblemModal" class="modal">
            <div class="modal-content">
                <span class="close-modal" onclick="closeModal('createProblemModal')">&times;</span>
                <h2>Publicar Problema</h2>
                <form onsubmit="handleCreateProblem(event)">
                    <div class="form-group">
                        <label>Título del Problema</label>
                        <input type="text" id="problemTitle" required>
                    </div>
                    <div class="form-group">
                        <label>Descripción</label>
                        <textarea id="problemDescription" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Lenguaje</label>
                        <select id="problemLanguage" required>
                            <option value="">Selecciona...</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="sql">SQL</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Nivel</label>
                        <select id="problemLevel" required>
                            <option value="">Selecciona...</option>
                            <option value="beginner">Principiante</option>
                            <option value="intermediate">Intermedio</option>
                            <option value="advanced">Avanzado</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary">Publicar</button>
                </form>
            </div>
        </div>

        <!-- Create Project Modal -->
        <div id="createProjectModal" class="modal">
            <div class="modal-content">
                <span class="close-modal" onclick="closeModal('createProjectModal')">&times;</span>
                <h2>Crear Nuevo Proyecto</h2>
                <form onsubmit="handleCreateProject(event)">
                    <div class="form-group">
                        <label>Nombre del Proyecto</label>
                        <input type="text" id="projectName" required>
                    </div>
                    <div class="form-group">
                        <label>Descripción</label>
                        <textarea id="projectDescription" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Tecnologías</label>
                        <input type="text" id="projectTech" placeholder="Ej: React, Node.js, MongoDB" required>
                    </div>
                    <div class="form-group">
                        <label>Máximo de Participantes</label>
                        <input type="number" id="projectMax" min="2" max="20" required>
                    </div>
                    <button type="submit" class="btn-primary">Crear Proyecto</button>
                </form>
            </div>
        </div>
    `;

    const modalsContainer = document.getElementById('modals-container');
    if (modalsContainer) {
        modalsContainer.innerHTML = modalsHTML;
    }
}

// Función para cargar datos desde JSON
async function loadData() {
    const dataPath = window.location.pathname.includes('/pages/') ? '../data/' : 'data/';

    try {
        // Cargar problemas
        const problemsResponse = await fetch(dataPath + 'problems.json');
        const problems = await problemsResponse.json();
        window.problemsData = problems;

        // Cargar grupos
        const groupsResponse = await fetch(dataPath + 'groups.json');
        const groups = await groupsResponse.json();
        window.groupsData = groups;

        // Cargar proyectos
        const projectsResponse = await fetch(dataPath + 'projects.json');
        const projects = await projectsResponse.json();
        window.projectsData = projects;

        // Renderizar contenido según la página
        renderPageContent();

    } catch (error) {
        console.error('Error cargando datos:', error);
    }
}

// Renderizar contenido según la página actual
function renderPageContent() {
    const path = window.location.pathname;

    if (path.includes('index.html') || path.endsWith('/')) {
        renderHomePage();
    } else if (path.includes('problemas.html')) {
        renderProblems();
    } else if (path.includes('grupos.html')) {
        renderGroups();
    } else if (path.includes('proyectos.html')) {
        renderProjects();
    } else if (path.includes('comunidad.html')) {
        renderCommunity();
    }
}

// Renderizar página de inicio
function renderHomePage() {
    const featuredProblems = document.getElementById('featured-problems');
    const featuredGroups = document.getElementById('featured-groups');

    if (featuredProblems && window.problemsData) {
        featuredProblems.innerHTML = window.problemsData.slice(0, 3).map(problem => `
            <div class="card">
                <h3>${problem.title}</h3>
                <p>${problem.description}</p>
                <div class="card-meta">
                    <span>👤 ${problem.author}</span>
                    <span>⭐ ${problem.rating}</span>
                </div>
            </div>
        `).join('');
    }

    if (featuredGroups && window.groupsData) {
        featuredGroups.innerHTML = window.groupsData.slice(0, 3).map(group => `
            <div class="card">
                <h3>${group.name}</h3>
                <span class="group-type type-${group.type}">${getGroupTypeLabel(group.type)}</span>
                <p>${group.description}</p>
                <div class="card-meta">
                    <span>👥 ${group.members} miembros</span>
                    <span>📚 ${group.projects} proyectos</span>
                </div>
            </div>
        `).join('');
    }
}

// Obtener etiqueta de tipo de grupo
function getGroupTypeLabel(type) {
    const labels = {
        'university': 'Universidad',
        'highschool': 'Secundaria',
        'mixed': 'Mixto',
        'teacher': 'Docentes'
    };
    return labels[type] || type;
}