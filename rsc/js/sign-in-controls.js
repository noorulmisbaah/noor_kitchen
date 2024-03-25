function toggleFormsInterface(arg) {
    if (arg === 'show') {
        signFormsInterface.style.opacity = signFormsInterface.style.zIndex = 1;
    } else if (arg === 'hide') {
        signFormsInterface.style.opacity = 0;
        signFormsInterface.style.zIndex = -1;
    }
    return;
}

function changeForms(arg) {
    forms.forEach(form => form.classList.add('hidden'));
    arg.classList.remove('hidden');
}

function createAccount() {
    const username = signupUsernameField.value.toLowerCase();
    const password = signupPasswordField.value;
    const confirmP = confirmPasswordField.value;
    const email = signupEmailField.value;

    if (!username || !password || !confirmP || !email)
        showNotificationBox('Input Error', 'Some fields are empty. You need to fill all the fields.');
    else if (password !== confirmP)
        showNotificationBox('Password Mismatch', 'The passwords do not match.');
    else {
        fetch('signup', {
            body: JSON.stringify({ username, password, email }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(({ created }) => {
            if (created)
                showNotificationBox('Account Created', 'Your account has been created successfully. You can sign in now.');
            else {
                showNotificationBox('Unsuccessful', 'Sorry, your new account could not be created. This may be due to another user is having the same information with yours or connection error.');
            }
        })
        .catch(err => console.error(err));
    }
}

function signIn() {
    const username = signinUsernameField.value.toLowerCase();
    const password = signinPasswordField.value;

    if (!username || !password)
        showNotificationBox('Input Error', 'Some fields are empty. You need to fill all the fields.');
    else {
        fetch('signin', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(({ found }) => {
            if (!found)
                showNotificationBox('Error', "Sorry, we couldn't sign you in because either your username or password is incorrect.");
            else {
                formInput.value = username;
                formButton.click();
            }
        })
    }
}

const forms = document.querySelectorAll('.form');
const displayForm = document.querySelector('.sign');
const closeSignForms = document.querySelector('.close-sign-in-form');
const signFormsInterface = document.querySelector('.sign-in-form');
const signinFields = document.querySelectorAll('.sign-in-form input');
const signinForm = document.querySelector('.sign-in');
const signupForm = document.querySelector('.sign-up');
const accountRecoveryForm = document.querySelector('.recover-account');
const createAccountText = document.querySelector('[create-account-span]');
const recoverAccountText = document.querySelector('[recover-account-span]');
const signinText = document.querySelector('[sign-in-span]');
const signinButton = document.querySelector('[sign-in-button]');
const signupButton = document.querySelector('[sign-up-button]');
const accountRecoveryButton = document.querySelector('[account-recovery-button]');
const signinUsernameField = document.querySelector('[sign-in-username-field]');
const signinPasswordField = document.querySelector('[sign-in-password-field]');
const signupUsernameField = document.querySelector('[sign-up-username-field]');
const signupPasswordField = document.querySelector('[sign-up-password-field]');
const confirmPasswordField = document.querySelector('[confirm-password-field]');
const signupEmailField = document.querySelector('[sign-up-email-field]');
const formInput = document.getElementById('current-username');
const formButton = document.getElementById('submit')
const accountRecoveryEmailField = document.querySelector('[account-recovery-email-field]');

displayForm.addEventListener('click', () => {
    toggleFormsInterface('show');
});

closeSignForms.addEventListener('click', () => {
    toggleFormsInterface('hide');
    forms.forEach(form => form.classList.add('hidden'));
    signinFields.forEach(field => field.value = '');
    forms[0].classList.remove('hidden');
});

createAccountText.addEventListener('click',() => {
    changeForms(signupForm);
});

recoverAccountText.addEventListener('click', () => {
    changeForms(accountRecoveryForm);
});

signinText.addEventListener('click', () => {
    changeForms(signinForm);
});

signinButton.addEventListener('click', () => {
    signIn();
});

signupButton.addEventListener('click', () => {
    createAccount();
});

accountRecoveryButton.addEventListener('click', () => {
    alert('recovery');
});