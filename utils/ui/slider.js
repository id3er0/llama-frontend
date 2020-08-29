import $ from 'jquery';
import 'jquery-touch-events';

/**
 * Slider
 */
class Slider {
  constructor(el) {
    const _self = this;
    this.sliderClass = 'js-slider';
    this.innerClass = this.sliderClass + '__inner';
    this.buttonClass = this.sliderClass + '__button';
    this.buttonRightClass = '_b';
    this.itemClass = this.sliderClass + '__item';

    this.$slider = $(el);
    this.$inner = this.$slider.find(`.${this.innerClass}`);
    this.$buttons = this.$slider.find(`.${this.buttonClass}`);
    this.$items = this.$slider.find(`.${this.itemClass}`);

    const wW = window.innerWidth;

    this.scrollingAmount = 0;
    this.adjustPadding = 0;
    this.itemWidth = 0;

    this.init();

    window.addEventListener('resize', () => {
      this.init();
    });

    this.$buttons
      .on('click', (event) => {
        const $button = $(event.currentTarget);
        const direction = $button.hasClass(this.buttonRightClass) ? 1 : -1;
        this._setScrollingAmount(direction);
        this._scrollTo(true);
      });
  }

  _setItemWidth() {
    this.itemWidth = this.$items.outerWidth();
    this.adjustPadding = this.$items.outerWidth(true) - this.$items.outerWidth();
  }

  _setScrollingAmount(direction) {
    const scrolledAmount = this.$inner.scrollLeft() / (this.itemWidth + this.adjustPadding / 2);
    const newAmount = Math.round(scrolledAmount) + direction;
    const adjustMaxAmount = Math.round(this.$inner.outerWidth() / this.$items.outerWidth(true));
    let max = this.$items.length - adjustMaxAmount;
    max = max > 0 ? max : 0;

    switch (true) {
      case newAmount < 0:
        this.scrollingAmount = max;
        break;
      case newAmount > max:
        this.scrollingAmount = 0;
        break;
      default:
        this.scrollingAmount = newAmount;
        break;
    }
  }

  _scrollTo(smooth = false) {
    if (!this.$inner[0]) {
      return;
    }
    let left = this.scrollingAmount * this.itemWidth;

    if (this.scrollingAmount) {
      left += this.adjustPadding * this.scrollingAmount;
    }

    const options = {
      top: 0,
      left,
    };
    if (smooth) {
      options.behavior = 'smooth';
    }
    this.$inner[0].scrollTo(options);
  }

  init() {
    this._setItemWidth();
    this._scrollTo();
  }
}

export default Slider;
