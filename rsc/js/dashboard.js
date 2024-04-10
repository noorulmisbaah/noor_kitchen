function toggleSections(index) {
    sections.forEach(section => section.style.display = 'none');
    sections[index].style.display = 'block';   
}

function toggleInformationForm(option) {
    if (option === 'show') {
        updateInformationForm.style.opacity = updateInformationForm.style.zIndex = 1;
    } else if (option === 'hide') {
        updateInformationForm.style.opacity = 0;
        updateInformationForm.style.zIndex = -1;
    } else {
        return;
    }
}

function updateAccount() {
    const newUsername = newUsernameField.value;
    const newUseremail = newUseremailField.value;
    const oldPassword = oldPasswordField.value;
    const newPassword = newPasswordField.value;
    
    if (!newUsername && !newUseremail && !oldPassword && !newPassword) {
        showNotificationBox('Not Updated', 'No update was made to your account.');
    } else if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
       showNotificationBox('Password Missing', 'To update your password, you need to provide the old password and a new one.');
    } else {
       fetch('update-account', {
           body: JSON.stringify({ username, newUsername, newUseremail, oldPassword, newPassword }),
           method: 'POST',
           headers: { 'Content-Type': 'application/json' }
       }).then(res => res.json()).then(({ updated, response }) => {
           if (updated)
               returnHomeButton.click();
           else {
               showNotificationBox('Update Failed',
               `Your account could not be updated because ${response}`
               );
           }
       }).catch(err => console.log(err));
    }
}

function deleteAccount() {
    fetch('remove-user', {
        body: JSON.stringify({ username }),
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(({ removed }) => {
        if (removed) {
            returnHomeButton.click();
        } else {
            showNotificationBox('Unsuccessful', 'Sorry, your account could not be removed.');
        }
    }).catch(err => console.log(err));
}

const username = document.querySelector('[username]').innerText;
const leftPart = document.querySelector('.left-part');
const sections = document.querySelectorAll('.section');
const menuIcon = document.querySelector('.menu-icon');
const sideItems = document.querySelectorAll('.item');
const closeMenuIcon = document.querySelector('.close-side-icon');
const userInputField = document.querySelector('[user-input-field]');
const submitUsernameButton = document.querySelector('[submit-username-button]');
const closeUpdateInformationForm = document.querySelector('.close-update-information-form');
const newUsernameField = document.querySelector('[new-username-field]');
const newUseremailField = document.querySelector('[new-email-field]');
const oldPasswordField = document.querySelector('[old-password-field]');
const newPasswordField = document.querySelector('[new-password-field]');
const returnHomeButton = document.querySelector('[return-home]');
const makeUpdateButton = document.getElementById('make-update-button');
const updateInformationForm = document.getElementById('update-information-form');
const updateAccountButton = document.getElementById('update-account-button');
const deleteAccountButton = document.getElementById('delete-account-button');

sideItems.forEach((item, index) => { 
    item.addEventListener('click', () => {
        toggleSections(index);
        
        if (window.innerWidth < 700) {
            leftPart.style.left = '-50rem';
            closeMenuIcon.style.display = 'none';
            menuIcon.style.display = 'inline-block';
        }
        
        if (item.innerText === 'Shopping Area') {
            userInputField.value = username;
            console.log(username);
            submitUsernameButton.click();
        }
    });
});

updateAccountButton.addEventListener('click', () => {
    updateAccount();
});

deleteAccountButton.addEventListener('click', () => {
    showConfirmationBox('Delete Account?', 'Are you sure you want to delete your account?', deleteAccount);
})

closeUpdateInformationForm.addEventListener('click', () => {
    toggleInformationForm('hide');
});

makeUpdateButton.addEventListener('click', () => {
    toggleInformationForm('show');
})

menuIcon.addEventListener('click', () => {
    leftPart.style.left = 0;
    menuIcon.style.display = 'none';
    closeMenuIcon.style.display = 'inline-block';
});

closeMenuIcon.addEventListener('click', () => {
    leftPart.style.left = '-50rem';
    closeMenuIcon.style.display = 'none';
    menuIcon.style.display = 'inline-block';
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 700) {
        leftPart.style.left = 0
        menuIcon.style.display = closeMenuIcon.style.display = 'none';
    } else {
        leftPart.style.left = '-50rem';
        menuIcon.style.display = 'inline-block';
        closeMenuIcon.style.display = 'none';
    }
});
