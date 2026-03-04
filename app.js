// app.js

/** --- Shared UI Rendering --- **/
function renderSharedUI() {
    const navHtml = `
    <nav class="bg-white dark:bg-darkcard shadow-sm fixed w-full z-50 top-0 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="index.html" class="flex-shrink-0 flex items-center gap-2">
                        <i class="fas fa-graduation-cap text-primary text-3xl"></i>
                        <span class="font-bold text-xl tracking-tight">EduPlatform</span>
                    </a>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="index.html" class="text-gray-600 dark:text-gray-300 hover:text-primary transition">Home</a>
                    <a href="index.html#featured-courses" class="text-gray-600 dark:text-gray-300 hover:text-primary transition">Courses</a>
                    <a href="dashboard.html" class="text-gray-600 dark:text-gray-300 hover:text-primary transition">Dashboard</a>
                    <button id="theme-toggle" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition">
                        <i class="fas fa-moon dark:hidden"></i>
                        <i class="fas fa-sun hidden dark:block"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>`;

    const navContainer = document.getElementById('navbar-container');
    if(navContainer) navContainer.innerHTML = navHtml;
}

document.addEventListener('DOMContentLoaded', () => {
    renderSharedUI();
});