try {
    const imageSrc = document.querySelector('[image-src]').innerText;
    const itemImage = document.querySelector('[item-image]');
    
    itemImage.src = imageSrc;
} catch (e) {

}