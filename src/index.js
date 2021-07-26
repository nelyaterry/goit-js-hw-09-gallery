const images = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

const jsGallery = document.querySelector('.gallery.js-gallery');
const lightbox = document.querySelector('.lightbox');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const lightboxImage = document.querySelector('.lightbox__image');
const btnCloseModal = document.querySelector('.lightbox__button')

let currentIndex;

jsGallery.insertAdjacentHTML('beforeend', createPhotoCards(images));

jsGallery.addEventListener('click', getCurrentIndex);
jsGallery.addEventListener('click', modalOpen);
btnCloseModal.addEventListener('click', modalClose);
lightboxOverlay.addEventListener('click', modalClose);
window.addEventListener('keydown', onEscClose);

function createPhotoCards(images) {
    return images.map(({ preview, original, description }, idx) => {
        return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index=${idx}
            alt="${description}"
          />
        </a>
        </li>`;
    })
        .join('');
};

const getUrl = (src, alt) => {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
};

function modalOpen(e) {
    e.preventDefault();

    if (!e.target.classList.contains('gallery__image')) {
        return;
    };

    lightbox.classList.add('is-open');

    getUrl(e.target.dataset.source, e.target.alt);
    window.addEventListener('keydown', onKeyPress);

};

function onKeyPress(e) {
    if (e.code === 'ArrowRight') {
        onArrowRight()
    } else if (e.code === 'ArrowLeft') {
        onArrowLeft()
    };
};

function modalClose() {
    lightbox.classList.remove('is-open');
    getUrl('', '');
};

function onEscClose(e) {
    if (e.code === 'Escape') {
        modalClose();
    }
};

function getCurrentIndex(e) {
    if (!e.target.classList.contains('gallery__image')) {
        return;
    };

    return currentIndex = Number(e.target.dataset.index);
};

function onArrowLeft() {
    if (currentIndex - 1 < 0) {
        currentIndex = images.length - 1;
    } else {
        currentIndex -= 1;
    };

    getUrl(
        images[currentIndex].original,
        images[currentIndex].description
    );
};

function onArrowRight() {
    if (currentIndex + 1 > images.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex += 1;
    };

    getUrl(
        images[currentIndex].original,
        images[currentIndex].description
    );
};