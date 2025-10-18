// auth.js - Manejo de autenticación

// Variable global para usuarios (simulación de base de datos)
let usersDatabase = [];

// Verificar estado de autenticación
function checkAuthStatus() {
    const user = getCurrentUser();
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');

    if (user && authButtons && userInfo) {
        authButtons.classList.add('hidden');
        userInfo.classList.remove('hidden');

        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');

        if (userAvatar) {
            userAvatar.textContent = user.name.charAt(0).toUpperCase();
        }
        if (userName) {
            userName.textContent = user.name;
        }
    }
}

// Obtener usuario actual
function getCurrentUser() {
    const userStr = sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Actualizar formulario de registro según tipo de usuario
function updateRegisterForm() {
    const userType = document.getElementById('regType').value;
    const schoolGroup = document.getElementById('schoolGroup');
    const codeGroup = document.getElementById('codeGroup');

    if (userType === 'student-high' || userType === 'student-uni') {
        schoolGroup.style.display = 'block';
        codeGroup.style.display = 'block';
        document.getElementById('regSchool').required = true;
        document.getElementById('regCode').required = true;
    } else if (userType === 'teacher') {
        schoolGroup.style.display = 'block';
        codeGroup.style.display = 'none';
        document.getElementById('regSchool').required = true;
        document.getElementById('regCode').required = false;
    } else {
        schoolGroup.style.display = 'none';
        codeGroup.style.display = 'none';
        document.getElementById('regSchool').required = false;
        document.getElementById('regCode').required = false;
    }
}

// Manejar registro
function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('regName').value;
    const type = document.getElementById('regType').value;
    const school = document.getElementById('regSchool').value;
    const code = document.getElementById('regCode').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    // Validación básica
    if (!name || !type || !email || !password) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }

    if (type !== 'teacher' && (!school || !code)) {
        alert('Los estudiantes deben proporcionar institución y código estudiantil');
        return;
    }

    // Crear usuario
    const newUser = {
        id: Date.now(),
        name: name,
        type: type,
        school: school || 'N/A',
        code: code || 'N/A',
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    // Guardar en "base de datos" simulada
    usersDatabase.push(newUser);

    // Guardar en sessionStorage
    sessionStorage.setItem('currentUser', JSON.stringify(newUser));
    sessionStorage.setItem('usersDatabase', JSON.stringify(usersDatabase));

    // Cerrar modal y actualizar UI
    closeModal('registerModal');
    checkAuthStatus();

    alert('¡Cuenta creada exitosamente! Bienvenido a CodeSchool, ' + name);

    // Limpiar formulario
    document.getElementById('regName').value = '';
    document.getElementById('regType').value = '';
    document.getElementById('regSchool').value = '';
    document.getElementById('regCode').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
}

// Manejar inicio de sesión
function handleLogin(event) {
    event.preventDefault();

    const school = document.getElementById('loginSchool').value;
    const code = document.getElementById('loginCode').value;
    const name = document.getElementById('loginName').value;
    const password = document.getElementById('loginPassword').value;

    // Cargar base de datos de usuarios
    const storedUsers = sessionStorage.getItem('usersDatabase');
    if (storedUsers) {
        usersDatabase = JSON.parse(storedUsers);
    }

    // Buscar usuario
    const user = usersDatabase.find(u =>
        u.school === school &&
        u.code === code &&
        u.name === name &&
        u.password === password
    );

    if (user) {
        // Guardar sesión
        sessionStorage.setItem('currentUser', JSON.stringify(user));

        // Cerrar modal y actualizar UI
        closeModal('loginModal');
        checkAuthStatus();

        alert('¡Bienvenido de nuevo, ' + user.name + '!');

        // Limpiar formulario
        document.getElementById('loginSchool').value = '';
        document.getElementById('loginCode').value = '';
        document.getElementById('loginName').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        alert('Credenciales incorrectas. Por favor verifica tus datos.');
    }
}

// Cerrar sesión
function logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        sessionStorage.removeItem('currentUser');

        const authButtons = document.getElementById('authButtons');
        const userInfo = document.getElementById('userInfo');

        if (authButtons && userInfo) {
            authButtons.classList.remove('hidden');
            userInfo.classList.add('hidden');
        }

        alert('Has cerrado sesión exitosamente');

        // Redirigir a inicio
        navigateToPage('index');
    }
}

// Manejar creación de grupo
function handleCreateGroup(event) {
    event.preventDefault();

    const user = getCurrentUser();
    if (!user) {
        alert('Debes iniciar sesión para crear un grupo');
        closeModal('createGroupModal');
        openModal('loginModal');
        return;
    }

    const groupName = document.getElementById('groupName').value;
    const groupType = document.getElementById('groupType').value;
    const groupDescription = document.getElementById('groupDescription').value;
    const groupLanguage = document.getElementById('groupLanguage').value;

    const newGroup = {
        id: Date.now(),
        name: groupName,
        type: groupType,
        description: groupDescription,
        language: groupLanguage,
        creator: user.name,
        members: 1,
        projects: 0,
        createdAt: new Date().toISOString()
    };

    // Agregar a datos globales
    if (window.groupsData) {
        window.groupsData.unshift(newGroup);
        renderGroups();
    }

    closeModal('createGroupModal');
    alert('¡Grupo creado exitosamente!');

    // Limpiar formulario
    document.getElementById('groupName').value = '';
    document.getElementById('groupType').value = '';
    document.getElementById('groupDescription').value = '';
    document.getElementById('groupLanguage').value = '';
}

// Manejar creación de problema
function handleCreateProblem(event) {
    event.preventDefault();

    const user = getCurrentUser();
    if (!user) {
        alert('Debes iniciar sesión para publicar un problema');
        closeModal('createProblemModal');
        openModal('loginModal');
        return;
    }

    const problemTitle = document.getElementById('problemTitle').value;
    const problemDescription = document.getElementById('problemDescription').value;
    const problemLanguage = document.getElementById('problemLanguage').value;
    const problemLevel = document.getElementById('problemLevel').value;

    const newProblem = {
        id: Date.now(),
        title: problemTitle,
        description: problemDescription,
        language: problemLanguage,
        level: problemLevel,
        author: user.name,
        userType: getUserTypeLabel(user.type),
        answers: 0,
        createdAt: new Date().toISOString()
    };

    // Agregar a datos globales
    if (window.problemsData) {
        window.problemsData.unshift(newProblem);
        renderProblems();
    }

    closeModal('createProblemModal');
    alert('¡Problema publicado exitosamente!');

    // Limpiar formulario
    document.getElementById('problemTitle').value = '';
    document.getElementById('problemDescription').value = '';
    document.getElementById('problemLanguage').value = '';
    document.getElementById('problemLevel').value = '';
}

// Manejar creación de proyecto
function handleCreateProject(event) {
    event.preventDefault();

    const user = getCurrentUser();
    if (!user) {
        alert('Debes iniciar sesión para crear un proyecto');
        closeModal('createProjectModal');
        openModal('loginModal');
        return;
    }

    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const projectTech = document.getElementById('projectTech').value;
    const projectMax = document.getElementById('projectMax').value;

    const newProject = {
        id: Date.now(),
        name: projectName,
        description: projectDescription,
        technologies: projectTech,
        creator: user.name,
        currentMembers: 1,
        maxMembers: parseInt(projectMax),
        status: 'recruiting',
        createdAt: new Date().toISOString()
    };

    // Agregar a datos globales
    if (window.projectsData) {
        window.projectsData.unshift(newProject);
        renderProjects();
    }

    closeModal('createProjectModal');
    alert('¡Proyecto creado exitosamente!');

    // Limpiar formulario
    document.getElementById('projectName').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('projectTech').value = '';
    document.getElementById('projectMax').value = '';
}

// Obtener etiqueta de tipo de usuario
function getUserTypeLabel(type) {
    const labels = {
        'student-high': 'Secundaria',
        'student-uni': 'Universidad',
        'teacher': 'Docente'
    };
    return labels[type] || type;
}