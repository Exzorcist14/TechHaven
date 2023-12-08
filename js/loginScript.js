function checkRegistration() {
    let answer = prompt("Желаете пройти регистрацию на сайте?");

    if (answer === "да") {
        alert("Круто!");
    }

    else {
        alert("Попробуй ещё раз");
    }
}

let login = prompt("Введите логин");
if (login == "Админ") {
    let password = prompt("Введите пароль");

    if (password == "Я главный") {
        alert("Здравствуйте!");
    }

    else if (password) {
        alert("Неверный пароль");
    }

    else {
        alert("Отменено");
    }
}

else {
    alert("Я вас не понимаю");
}