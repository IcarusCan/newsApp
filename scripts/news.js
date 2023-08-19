'use strict';

// Get current user from localStorage
const CUR_USER = 'CURRENT_USER';
let [user] = getFromStorage(CUR_USER);
let currentUser = [];

// Get current setting for API from localStorage
const PAGE_SIZE = 'CURRENT_PAGE_SIZE';
let curPageSize = getFromStorage(PAGE_SIZE);
const CATEGORY = 'CURRENT_CATEGORY';
let curCategory = getFromStorage(CATEGORY);

// Select elements
const newsContainer = document.querySelector('#news-container');
const paginationElement = document.querySelector('.pagination');

// Get the news from this API
const apiPars = {
  country: 'us',
  category: curCategory.length !== 0 ? curCategory : 'General',
  pageSize: curPageSize.length !== 0 ? curPageSize : 5,
  page: 1,
  apiKey: 'bda2d7222d584f51a1edd4788ce76dcc', // '6a1386b1e6a04d9097e6752cf5e19237',
};
let apiUrl =
  'https://newsapi.org/v2/top-headlines' +
  `?country=${apiPars.country}` +
  `&category=${apiPars.category}` +
  `&pageSize=${apiPars.pageSize}` +
  `&page=${apiPars.page}` +
  `&apiKey=${apiPars.apiKey}`;

// Function to render the pagination control
const renderPagination = function (apiParameters, pageNo) {
  paginationElement.innerHTML = `
    <li class="page-item" ${
      apiParameters.page === 1 ? 'style="display:none"' : ''
    }>
      <button class="page-link" href="#" id="btn-prev">Previous</button>
    </li>
    <li class="page-item disabled">
      <a class="page-link" id="page-num">${apiParameters.page}</a>
    </li>
    <li class="page-item" ${
      apiParameters.page === pageNo ? 'style="display:none"' : ''
    }>
      <button class="page-link" id="btn-next">Next</button>
    </li>
  `;
};

// Function to render the news for user
const renderNews = async function (btnID = '') {
  try {
    if (btnID === 'btn-prev') {
      apiPars.page--;
    } else if (btnID === 'btn-next') {
      apiPars.page++;
    } else {
      apiPars.page = 1;
    }

    // Matches the pattern 'page=' followed by one or more digits
    apiUrl = apiUrl.replace(/page=\d+/, `page=${apiPars.page}`);
    const newsData = await currentUser.getNews(apiUrl);

    // Calculate number of pages to render
    let noOfPage = Math.floor(newsData.totalResults / apiPars.pageSize) + 1;
    if (apiPars.page <= noOfPage) {
      // Render the pagination control
      renderPagination(apiPars, noOfPage);

      // Clear the contents of container
      newsContainer.innerHTML = '';

      // Render the new one
      newsData.articles.forEach(a => {
        newsContainer.insertAdjacentHTML(
          'beforeend',
          `
            <div class="card flex-row flex-wrap">
              <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="${a.urlToImage ?? ''}"
                      class="card-img"
                      alt="${a.title ?? ''}">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${a.title ?? 'No title'}</h5>
                      <p class="card-text">${a.description ?? ''}</p>
                      <a href="${a.url}"
                        class="btn btn-primary">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
        );
      });
    }
  } catch (error) {
    console.error(
      `*** Network response was not OK! ****** ${error.message} ***`
    );
  }
};

// Handle the pagination element
paginationElement.addEventListener('click', function (e) {
  if (!e.target.closest('.page-item')) return;

  if (e.target.id === 'btn-prev' || e.target.id === 'btn-next') {
    renderNews(e.target.id);
  }
});

// If there are a user, who logged in
// console.log(user);
if (!user) {
  newsContainer.insertAdjacentHTML('beforeend', 'Please Login First!');
} else {
  currentUser = parseUser(user);
  renderNews();
  saveToStorage(PAGE_SIZE, apiPars.pageSize);
  saveToStorage(CATEGORY, apiPars.category);
}
