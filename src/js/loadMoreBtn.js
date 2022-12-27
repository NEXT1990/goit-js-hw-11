export class LoadMoreBtn {
  constructor(className, OnButtonLoadMoreClick) {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<button type="button" class="${className}">Load more</button>`
    );
    this.buttonLoadMore = document.querySelector(`.${className}`);
    this.buttonLoadMore.addEventListener('click', OnButtonLoadMoreClick);
    this.hide();
  }
  hide() {
    this.buttonLoadMore.style.display = 'none';
  }
  show() {
    this.buttonLoadMore.style.display = 'block';
  }

  loading() {
    this.buttonLoadMore.textContent = 'Loading...';
  }

  endLoading() {
    this.buttonLoadMore.textContent = 'Load more';
  }
}
