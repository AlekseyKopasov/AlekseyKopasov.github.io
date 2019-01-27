var feedback = document.querySelector('.modal-write-us');
var modalMap = document.querySelector('.modal-map');
var modalFeedback = document.querySelector('.modal-feedback');
var modal = document.querySelector('.modal');
var closeFeedback = document.querySelector('.modal-close');
var userName = document.querySelector('#name');
var userMail = document.querySelector('#mail');
var form = document.querySelector('.feedback-form');

var openMap = document.querySelector('.modal-open-map');
var modalMap = document.querySelector('.modal-map');

var addToBasket = document.querySelectorAll('.btn-buy');
var modalPurchase = document.querySelector('.purchase');
var cart = document.querySelector('.user-panel__link-cart');
var productsCount = 0;


var isStorageSupport = true;
var storageUserName = '';

var slides = document.querySelectorAll('.offer-slide');
var countSlide = slides.length;
var nextSlide = document.querySelector('.slider-arrow-right');
var previousSlide = document.querySelector('.slider-arrow-left');
var dotSlide = document.querySelectorAll('.slide-indicators');
var currentSlide = 0;

var tabItem = document.querySelectorAll('.services-item');
var tabContent = document.querySelectorAll('.tab-content');


/* =====Попап с формой обратной связи===== */

if (feedback) {
  try {
    storageUserName = localStorage.getItem('userName');
  } catch (err) {
    isStorageSupport = false;
  }

  feedback.addEventListener('click', function(evt) {
    evt.preventDefault();
    modalFeedback.classList.add('modal-show');
    userName.focus();
  });

  if (storageUserName) {
    userName.value = storageUserName;
  } else {
    userName.focus();
  }

  closeFeedback.addEventListener('click', function(evt) {
    evt.preventDefault();
    modal.classList.remove('modal-show');
    modal.classList.remove('modal-error');
  });

  form.addEventListener('submit', function(evt) {
    if (!userName.value || !userMail.value) {
      evt.preventDefault();
      modal.classList.remove('modal-error');
      modal.offsetWidth = modal.offsetWidth;
      modal.classList.add('modal-error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('userName', userName.Value);
        localStorage.setItem('userMail', userMail.Value);
      }
    }
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      if (modal.classList.contains('modal-show')) {
        evt.preventDefault();
        modal.classList.remove('modal-show');
        modal.classList.remove('modal-error');
      }
    }
  });
}

/* ======Попап с картой====== */

if (modalMap) {
  var mapClose = modalMap.querySelector('.modal-close');
  openMap.addEventListener('click', function(evt) {
    evt.preventDefault();
    modalMap.classList.add('modal-show-map');
  });

  mapClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    modalMap.classList.remove('modal-show-map');
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      if (modalMap.classList.contains('modal-show-map')) {
        evt.preventDefault();
        modalMap.classList.remove('modal-show-map');
      }
    }
  });
}

/* =====Попап: Добавлено в корзину===== */

if (modalPurchase) {
  var purchaseClose = modalPurchase.querySelector('.modal-close');
  for (var i = 0; i < addToBasket.length; i++) {
    addToBasket[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      modalPurchase.classList.add('modal-show-purchase');
      productsCount++;
      cart.innerHTML = 'Корзина: ' + productsCount;
      cart.classList.add('basket-full');
    });
  }

  purchaseClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    modalPurchase.classList.remove('modal-show-purchase');
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (modalPurchase.classList.contains('modal-show-purchase')) {
        modalPurchase.classList.remove('modal-show-purchase');
      }
    }
  });
}

/*=============Slider=============*/

if (slides.length > 0) {
  nextSlide.addEventListener('click', function(evt) {
    if (currentSlide < countSlide - 1) {
      evt.preventDefault();
      currentSlide = currentSlide + 1;
      showSlide(currentSlide);
    };
  });

  previousSlide.addEventListener('click', function(evt) {
    if (currentSlide > 0) {
      evt.preventDefault();
      currentSlide = currentSlide - 1;
      showSlide(currentSlide);
    };
  });

  function showSlide(currentSlide) {
    for (var i = 0; i < countSlide; i++) {
      slides[i].classList.remove('offer-slide-active');
      dotSlide[i].classList.add('slide-indicators-current');
    };
    slides[currentSlide].classList.add('offer-slide-active');
    dotSlide[currentSlide].classList.remove('slide-indicators-current');
  };
};


/*======Tabs=====*/


if (tabContent.length > 0) {
  for (i = 0; i < tabItem.length; ++i) {
    tabItem[i].addEventListener('click', function(evt) {
      evt.preventDefault(evt);
      for (j = 0; j < tabItem.length; ++j) {
        tabItem[j].classList.remove('services-item-selected');
        tabContent[j].classList.remove('tab-content-active');
      };
      for (h = 0; h < tabItem.length; ++h) {
        if (tabItem[h] == this) {
          tabItem[h].classList.add('services-item-selected');
          tabContent[h].classList.add('tab-content-active');
        }
      }
    });
  };
}
