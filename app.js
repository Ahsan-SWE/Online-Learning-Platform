// app.js



// app.js (Data base)
// app.js (Add at the top of the file)

const coursesData = [
    { id: 1, title: "Modern HTML & CSS Mastery", instructor: "Sarah Jenkins", rating: 4.8, duration: "4h 30m", price: "Free", thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", description: "Learn to build responsive, modern websites.", youtubeVideoId: "pQN-pnXPaVg", lessons: generateLessons(1, "HTML/CSS Basics", 10) },
    { id: 2, title: "JavaScript for Beginners", instructor: "John Doe", rating: 4.9, duration: "6h 15m", price: "$19.99", thumbnail: "https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/1e2aee970db0.jpeg", description: "Master the fundamentals of JavaScript.", youtubeVideoId: "W6NZfCO5SIk", lessons: generateLessons(2, "JS Fundamentals", 8) },
    { id: 3, title: "UI/UX Design Principles", instructor: "Mike Ross", rating: 4.7, duration: "3h 45m", price: "$29.99", thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", description: "Learn how to design beautiful interfaces.", youtubeVideoId: "c9Wg6Cb_YlU", lessons: generateLessons(3, "Design Thinking", 5) }
];

// app.js (Add just below coursesData array)

const store = {
    getEnrolled: () => JSON.parse(localStorage.getItem('enrolledCourses') || '[]'),
    enroll: (id) => {
        let enrolled = store.getEnrolled();
        if(!enrolled.includes(id)) { enrolled.push(id); localStorage.setItem('enrolledCourses', JSON.stringify(enrolled)); }
    },
    getCompleted: () => JSON.parse(localStorage.getItem('completedLessons') || '[]'),
    markCompleted: (lessonId) => {
        let comp = store.getCompleted();
        if(!comp.includes(lessonId)) { comp.push(lessonId); localStorage.setItem('completedLessons', JSON.stringify(comp)); }
    },
    getLastWatched: () => JSON.parse(localStorage.getItem('lastWatched') || 'null'),
    setLastWatched: (courseId, lessonId) => localStorage.setItem('lastWatched', JSON.stringify({ courseId, lessonId }))
};


function generateLessons(courseId, topic, count) {
    let lessons = [];
    for(let i=1; i<=count; i++) {
        lessons.push({ id: `c${courseId}_l${i}`, num: i, title: `${topic} - Part ${i}`, duration: `${Math.floor(Math.random() * 10 + 5)}:00` });
    }
    return lessons;
}










/** --- Shared UI Rendering --- **/
function renderSharedUI() {

    const navHtml = `
    <nav class="bg-white dark:bg-darkcard shadow-sm fixed w-full z-50 top-0 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="index.html" class="flex-shrink-0 flex items-center gap-2">
                        <i class="fas fa-graduation-cap text-primary text-3xl"></i>
                        <span class="font-bold text-xl tracking-tight">Learn With Ahsan</span>
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


const footerHtml = `
    <footer class="bg-gray-900 text-white py-8 mt-auto">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h3 class="text-xl font-bold mb-4 flex items-center gap-2"><i class="fas fa-graduation-cap text-primary"></i> Learn With Ahsan</h3>
                <p class="text-gray-400 text-sm">Learn With Ahsan Is More Than Fun.</p>
            </div>
            <div>
                <h4 class="font-bold mb-4">Quick Links</h4>
                <ul class="space-y-2 text-gray-400 text-sm">
                    <li><a href="index.html" class="hover:text-white transition">Home</a></li>
                    <li><a href="dashboard.html" class="hover:text-white transition">Dashboard</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold mb-4">Connect</h4>
                <div class="flex space-x-4">
                    <a href="https://github.com/Ahsan-SWE" class="text-gray-400 hover:text-white text-xl transition"><i class="fab fa-github"></i></a>
                </div>
            </div>
        </div>
        <div class="mt-8 text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
            &copy; 2026 Learn With Ahsan. All rights reserved.
        </div>
    </footer>`;





    const navContainer = document.getElementById('navbar-container');
    if(navContainer) navContainer.innerHTML = navHtml;


const footerContainer = document.getElementById('footer-container');
    if(footerContainer) footerContainer.innerHTML = footerHtml;

const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        if(document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    };
    
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) themeBtn.addEventListener('click', toggleTheme);

}



function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    renderSharedUI();
    if(document.getElementById('home-page')) initHome();
    if(document.getElementById('course-page')) initCourse(); // Updated
});

// app.js (render dynamic featured courses grid on home page)

function createCourseCardHTML(course) {
    return `
    <div class="bg-white dark:bg-darkcard rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col group">
        <div class="relative overflow-hidden">
            <img src="${course.thumbnail}" alt="${course.title}" class="w-full h-48 object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 text-xs font-bold rounded shadow">${course.price}</div>
        </div>
        <div class="p-5 flex-grow flex flex-col">
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <i class="fas fa-star text-yellow-400 mr-1"></i> ${course.rating} 
                <span class="mx-2">•</span> <i class="far fa-clock mr-1"></i> ${course.duration}
            </div>
            <h3 class="font-bold text-lg mb-1 dark:text-white">${course.title}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">By ${course.instructor}</p>
            <div class="mt-auto">
                <a href="course.html?course=${course.id}" class="block w-full text-center bg-indigo-50 dark:bg-gray-700 text-primary dark:text-indigo-300 py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition">View Details</a>
            </div>
        </div>
    </div>`;
}

function initHome() {
    const grid = document.getElementById('courses-grid');
    if(grid) {
        grid.innerHTML = coursesData.map(c => createCourseCardHTML(c)).join('');
    }
}

// Update the DOMContentLoaded listener to call initHome
//(Update DOMContentLoaded listener)

document.addEventListener('DOMContentLoaded', () => {
    renderSharedUI();
    if(document.getElementById('home-page')) initHome();
    if(document.getElementById('course-page')) initCourse();
    if(document.getElementById('player-page')) initPlayer(); // Updated
});




// app.js (dynamically render course details and curriculum)


// app.js (Replace existing initCourse function)

function initCourse() {
    const courseId = parseInt(getQueryParam('course'));
    const course = coursesData.find(c => c.id === courseId);
    const content = document.getElementById('course-content');
    if(!course) return;

    const isEnrolled = store.getEnrolled().includes(course.id);
    const completed = store.getCompleted();
    
    content.innerHTML = `
        <div class="bg-white dark:bg-darkcard rounded-2xl shadow flex flex-col md:flex-row">
            <div class="md:w-1/2"><img src="${course.thumbnail}" class="w-full h-full object-cover min-h-[300px]"></div>
            <div class="md:w-1/2 p-8 flex flex-col justify-center">
                <h1 class="text-3xl font-bold mb-4">${course.title}</h1>
                <div class="flex gap-4 mt-auto">
                    <a href="player.html?course=${course.id}&lesson=1" class="flex-1 text-center bg-primary text-white px-6 py-3 rounded-xl font-bold">${isEnrolled ? 'Continue' : 'Start Course'}</a>
                    ${!isEnrolled ? `<button id="enroll-btn" class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold">Add to Dashboard</button>` : `<div class="flex-1 bg-green-100 text-green-700 px-6 py-3 rounded-xl font-bold text-center">Enrolled</div>`}
                </div>
            </div>
        </div>
        <div class="mt-12 bg-white dark:bg-darkcard shadow p-8">
            <h2 class="text-2xl font-bold mb-6">Curriculum</h2>
            <div class="space-y-3">
                ${course.lessons.map(lesson => `
                    <div class="flex justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span>${completed.includes(lesson.id) ? '✅' : '▶️'} ${lesson.title}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const enrollBtn = document.getElementById('enroll-btn');
    if(enrollBtn) {
        enrollBtn.addEventListener('click', () => { store.enroll(course.id); window.location.reload(); });
    }
}



// (more function for player page)


// app.js (Replace existing initPlayer function entirely with this one)

function initPlayer() {
    const courseId = parseInt(getQueryParam('course'));
    const lessonNum = parseInt(getQueryParam('lesson')) || 1;
    const course = coursesData.find(c => c.id === courseId);
    if(!course) return;

    const currentLesson = course.lessons.find(l => l.num === lessonNum) || course.lessons[0];
    
    // Auto Enroll & Track
    store.enroll(course.id);
    store.setLastWatched(course.id, currentLesson.num);
    const completed = store.getCompleted();
    
    document.getElementById('video-iframe').src = `https://www.youtube.com/embed/${course.youtubeVideoId}?rel=0`;
    document.getElementById('current-lesson-title').innerText = `${currentLesson.num}. ${currentLesson.title}`;
    document.getElementById('course-title-player').innerText = course.title;

    document.getElementById('lesson-list-container').innerHTML = course.lessons.map(l => `
        <a href="player.html?course=${course.id}&lesson=${l.num}" class="block p-3 border rounded ${l.num === currentLesson.num ? 'bg-indigo-50 dark:bg-gray-700' : 'bg-white dark:bg-darkcard'}">${completed.includes(l.id) ? '✅' : ''} ${l.title}</a>
    `).join('');

    const controls = document.getElementById('player-controls');
    let buttonsHtml = '';
    if(!completed.includes(currentLesson.id)) {
        buttonsHtml += `<button id="btn-complete" class="px-4 py-2 bg-green-500 text-white rounded mr-2">Mark Completed</button>`;
    }
    if(lessonNum < course.lessons.length) {
        buttonsHtml += `<button onclick="window.location.href='player.html?course=${course.id}&lesson=${lessonNum + 1}'" class="px-4 py-2 bg-primary text-white rounded">Next</button>`;
    } else {
        buttonsHtml += `<button onclick="window.location.href='dashboard.html'" class="px-4 py-2 bg-primary text-white rounded">Finish</button>`;
    }
    controls.innerHTML = buttonsHtml;

    const btnComplete = document.getElementById('btn-complete');
    if(btnComplete) btnComplete.addEventListener('click', () => { store.markCompleted(currentLesson.id); window.location.reload(); });
}




