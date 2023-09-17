// Add imports above this line
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

const listImages = document.querySelector('.gallery');
const markup = createMarkup(galleryItems);
listImages.insertAdjacentHTML('beforeend', markup);

function createMarkup(arr) {
  return arr
    .map(({ original, preview, description }) => {
      return `<div>
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
</div>
 `;
    })
    .join('');
}
console.log(markup);

const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
  captionDelay: 250,
  captionData: 'alt',
});
