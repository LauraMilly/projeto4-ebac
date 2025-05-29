const tabButtons = document.querySelectorAll('[data-tab-button]');
const tabLists = document.querySelectorAll('[data-tab-id]');
const paginations = document.querySelectorAll('.pagination');

const itemsPerPage = 12;

function isMobile() {
  return window.innerWidth <= 768;
}

function removeBtnActive() {
  tabButtons.forEach(btn => btn.classList.remove('show_tabs_button--is--active'));
}

function showTab(tabName) {
  const tab = document.querySelector(`[data-tab-id="${tabName}"]`);
  const pagination = tab.nextElementSibling;

  if (!tab) return;

  tabLists.forEach(tabItem => {
    tabItem.classList.remove('active');
  });

  paginations.forEach(paginationItem => {
    paginationItem.classList.remove('active');
  });

  tab.classList.add('active');
  pagination.classList.add('active');

  removeBtnActive();
  const btn = document.querySelector(`[data-tab-button="${tabName}"]`);
  if (btn) btn.classList.add('show_tabs_button--is--active');

  const items = tab.querySelectorAll('.films_list_item');
  const pages = pagination.querySelectorAll('.page');

  function showPage(pageNumber) {
    if (isMobile()) {
      items.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
      });
      pages.forEach(page => page.classList.remove('active'));
      return;
    }

    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      if (index >= start && index < end) {
        item.style.display = 'block';
        requestAnimationFrame(() => {
          item.style.opacity = '1';
        });
      } else {
        item.style.display = 'none';
        item.style.opacity = '0';
      }
    });

    pages.forEach(page => page.classList.remove('active'));
    pages[pageNumber - 1].classList.add('active');
  }

  pages.forEach((page, index) => {
    page.addEventListener('click', () => {
      showPage(index + 1);
    });
  });

  showPage(1);
}

tabButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const tabTarget = e.currentTarget.dataset.tabButton;
    showTab(tabTarget);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const firstTab = tabButtons[0].dataset.tabButton;
  showTab(firstTab);
});

window.addEventListener('resize', () => {
  const activeTab = document.querySelector('.films_list.active');
  if (!activeTab) return;
  const tabName = activeTab.dataset.tabId;
  showTab(tabName);
});
