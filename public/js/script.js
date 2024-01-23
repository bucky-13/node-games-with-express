const loginForm = document.querySelector('#loginForm');

function checkSuccess() {
  if (loginH2.classList.contains('green')) {
    console.log('bajs');
  }
}

function addListeners() {
  let returnLink = document.querySelector('.returnLink');
  let loginH2 = document.querySelector('.loginH2');

  returnLink.addEventListener('click', function () {
    checkSuccess(loginH2);
  });
}

loginForm.addEventListener('submit', addListeners);
