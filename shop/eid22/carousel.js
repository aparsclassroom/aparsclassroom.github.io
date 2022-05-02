const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['left', 'right'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  // Update css classes for gallery
  updateGallery() {
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i+1}`);
    });
  }

  // Update the current order of the carouselArray and gallery
  setCurrentState(direction) {

    if (direction.className == 'gallery-controls-left') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    
    this.updateGallery();
  }

  // Construct the carousel controls
  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;

      document.querySelector(`.gallery-controls-${control}`).innerHTML = `<i class="fas fa-angle-${control}"></i>`;
    });
  }
 
  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];

    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);

      });
    });
  }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();



document.getElementById('data-1').addEventListener('click', ()=>{
  window.open('http://enroll.apars.shop/22medical_eid22','_blank')
})

document.getElementById('data-2').addEventListener('click', ()=>{
  window.open('http://enroll.apars.shop/22physics_eid22','_blank')
})

document.getElementById('data-3').addEventListener('click', ()=>{
  window.open('http://enroll.apars.shop/varsity21_eid22','_blank')
})

document.getElementById('data-4').addEventListener('click', ()=>{
  window.open('http://enroll.apars.shop/22chemistry_eid','_blank')
})

document.getElementById('data-5').addEventListener('click', ()=>{
  window.open('http://enroll.apars.shop/22medical_eid22','_blank')
})

var clipboard = new ClipboardJS('.fa-copy');
clipboard.on('success', function(e) {
    Toastify({
      text: "Discount Coupon Copied !",
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true
    }).showToast();
    e.clearSelection();
});

clipboard.on('error', function(e) {
    alert('Action:', e.action);
});