const regInputs = {
    login : document.querySelector('.login'),
    password : document.querySelector('.password'),
    name : document.querySelector('.name'),
    surname : document.querySelector('.surname'),
    email : document.querySelector('.email'),
    dob : document.querySelector('.dob')
};

const authInputs = {
    login : document.querySelector('.login-auth'),
    password : document.querySelector('.password-auth'),
};

document.querySelector('.form-reg').addEventListener('submit', (ev) => {
    ev.preventDefault();

    const login = regInputs.login.value;
    const password = regInputs.password.value;
    const name = regInputs.name.value;
    const surname = regInputs.surname.value;
    const email = regInputs.email.value;
    const dob = regInputs.dob.value;

  

    fetch(`http://localhost:3000/reg?login=${login}&password=${password}&name=${name}&surname=${surname}&email=${email}&dob=${dob}`)
        .then(res => res.text())
        .then(console.log);
})

document.querySelector('.form-auth').addEventListener('submit', (ev) => {
    ev.preventDefault();

    const login = authInputs.login.value;
    const password = authInputs.password.value;

    fetch(`http://localhost:3000/auth?login=${ login }&password=${ password }`)
        .then(res => res.text())
        .then(console.log);
})