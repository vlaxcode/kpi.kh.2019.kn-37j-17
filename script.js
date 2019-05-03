"use strict";

// url: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // ближайший аналог внутренней функции
      // IsCallable в ECMAScript 5
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP && oThis
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

// url: https://javascript.ru/unsorted/top-10-functions#10-addevent
function addEvent(elem, evType, fn) {
  if (elem.addEventListener) {
    elem.addEventListener(evType, fn, false);
  }
  else if (elem.attachEvent) {
    elem.attachEvent('on' + evType, fn)
  }
  else {
    elem['on' + evType] = fn
  }
}


// --------- Класс-Родитель ------------
// Конструктор родителя пишет свойства конкретного объекта
function ClassCarousel(BlockId) {
  /* конфигурация */
    this.width = 130; // ширина изображения
    this.count = 3; // количество изображений

    this.carousel = document.getElementById(BlockId);
    this.list = carousel.querySelector('ul');
    this.listElems = carousel.querySelectorAll('li');

    this.position = 0; // текущий сдвиг влево

    
    addEvent(this.carousel.querySelector('.prev'), 'click', this.prev.bind(this));
    addEvent(this.carousel.querySelector('.next'), 'click', this.next.bind(this));
}

// Методы хранятся в прототипе
ClassCarousel.prototype.prev = function() {
  // сдвиг влево
  this.position = Math.min(this.position + this.width * this.count, 0)
  this.list.style.marginLeft = this.position + 'px';

}

ClassCarousel.prototype.next = function() {
   // сдвиг вправо
   // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
   this.position = Math.max(this.position - this.width * this.count, -this.width * (this.listElems.length - this.count));
   this.list.style.marginLeft = this.position + 'px';

}

var animal = new ClassCarousel('carousel');  