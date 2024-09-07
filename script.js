document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const titleInput = document.getElementById('task-title');
    const dueDateInput = document.getElementById('task-due-date');
    const tasksList = document.getElementById('tasks');

    let tasks = [];

    function renderTasks() {
        tasksList.innerHTML = tasks.map(task => `
            <li>
                <h3>${task.title}</h3>
                <p>Due: ${new Date(task.dueDate).toLocaleDateString()}</p>
            </li>
        `).join('');
    }

    function checkTaskNotifications() {
        const now = new Date();
        tasks.forEach(task => {
            const taskDate = new Date(task.dueDate);
            if (taskDate.getDate() === now.getDate() && taskDate.getMonth() === now.getMonth()) {
                new Notification('Task Reminder', {
                    body: `Don't forget to complete "${task.title}" today!`,
                });
            }
        });
    }

    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = titleInput.value;
        const dueDate = dueDateInput.value;

        if (title && dueDate) {
            tasks.push({ title, dueDate });
            titleInput.value = '';
            dueDateInput.value = '';

            renderTasks();
        }
    });

    setInterval(checkTaskNotifications, 60 * 60 * 1000); // Check every hour
})
