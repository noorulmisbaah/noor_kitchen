function toggleSearch(arg) {
    if (arg === 'show')
        searchSection.style.opacity = searchSection.style.zIndex = 1
    else if (arg === 'hide') {
        searchSection.style.opacity = 0;
        searchSection.style.zIndex = -1;
    }
    return;
}

function searchForItem() {
    const itemToSearch = document.querySelector('[item-search-field]').value;
    const usernameField = document.querySelector('[username-field]');
    const itemField = document.querySelector('[item-field]');
    const username = document.querySelector('[username]').value;
    const sendButton = document.querySelector('[send-search-button]');
  
    if (!itemToSearch)
      showNotificationBox('Invalid Input', 'Looks like the search field is empty. Enter the item you want to search.');
    else {
      usernameField.value = username;
      itemField.value = itemToSearch;
      sendButton.click();
    }
}

const searchSection = document.querySelector('.items-search');
const search = document.querySelector('.search');
const searchIcon = document.querySelector('.search-icon');
const closeSearchIcon = document.querySelector('.close-search-icon');
const searchItemButton = document.querySelector('[get-item-name-button]');

try {
    searchItemButton.addEventListener('click', () => {
        searchForItem();
    });
} catch(e) {

}

search.addEventListener('click', () => {
    toggleSearch('show');
});

closeSearchIcon.addEventListener('click', () => {
    toggleSearch('hide');
});
