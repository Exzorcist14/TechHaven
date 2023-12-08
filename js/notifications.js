document.addEventListener('DOMContentLoaded', function () {
    const storedNotifications = sessionStorage.getItem('notificationsCount');

    if (storedNotifications !== null) {
        document.querySelector('.notifications-number').textContent = storedNotifications;
    }

    const notificationsList = document.querySelector('.round-button');
    notificationsList.addEventListener('click', function () {
        document.querySelector('.notifications-number').textContent = '0';

        sessionStorage.setItem('notificationsCount', '0');
    });
});