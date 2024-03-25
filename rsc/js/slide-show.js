const slideText = document.querySelector('.column .column-text');
const slideImage = document.querySelector('.column img');
const columnTitle = document.querySelector('.column .title');
const sample = [
    {
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est expedita quaerat, 
        reprehenderit iure mollitia dignissimos libero illo consectetur velit distinctio.
        Lorem ipsum dolor sit amet.`,
        image: '/imgs/products/fried-rice.png',
        title: 'Best Dishes'
    },
    {
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est expedita quaerat, 
        reprehenderit iure mollitia dignissimos libero illo consectetur velit distinctio.
        Lorem ipsum dolor sit amet.`,
        image: '/imgs/products/strawberry-sponge-cake.png',
        title: 'Sweet Desserts'
    },
    {
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est expedita quaerat, 
        reprehenderit iure mollitia dignissimos libero illo consectetur velit distinctio.
        Lorem ipsum dolor sit amet.`,
        image: '/imgs/products/samosas.png',
        title: 'Delicious Snacks'
    }
];

var itemIndex = 0;

//setInterval(() => {
//    if (itemIndex === sample.length)
//        itemIndex = 0;
//
//    slideImage.src = sample[itemIndex].image;
//    slideText.innerText = sample[itemIndex].description;
//    columnTitle.innerText = sample[itemIndex].title;
//    itemIndex++;
//}, 3000);