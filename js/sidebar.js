document.addEventListener("DOMContentLoaded", function() {
    var sidebar = document.querySelector('sidebar');

    var imageFiles = ['RAM.jpg', 'RTX30.jpeg', 'KINGSTON (2).jpg', 'AEROCOOL.png', 'AESTHETICS.jpg'];

    var randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

    var imageElement = document.createElement('img');
    imageElement.src = 'img/gallery/' + randomImage;
    imageElement.alt = 'Случайное изображение';
    imageElement.width = 200;
    imageElement.height = 450;

    sidebar.appendChild(imageElement);
});