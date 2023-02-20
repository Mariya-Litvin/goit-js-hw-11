export default class LoadMoreBtn {
  constructor({ selector, isHidden }) {
    this.button = this.getButton(selector);
    //   Якщо кнопка скрита-скриваємо, якщо ні-показуємо її
    if (isHidden) this.hide();
    else this.show();
  }

  getButton(selector) {
    return document.querySelector(selector);
  }

  hide() {
    this.button.classList.add('hidden');
  }

  show() {
    this.button.classList.remove('hidden');
  }

  disable() {
    this.button.disabled = true;
    this.button.textContent = 'Loading...';
  }

  enable() {
    this.button.disabled = false;
    this.button.textContent = 'Load more';
  }
}
