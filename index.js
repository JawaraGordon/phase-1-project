// GLOBAL VARIABLES
const button = document.getElementById('submit');
let whiteList, textValue;
let likeBox = document.getElementById('likes');

// EVENT LISTENERS
button.addEventListener('submit', submitForm);
button.addEventListener('click', startLoader);

// FUNCTIONS
function startLoader() {
  let loader = document.createElement('img');
  loader.setAttribute('src', './img/recycle.gif');
  loader.setAttribute('height', '150px');
  loader.setAttribute('width', '150px');
  loader.setAttribute('alt', 'Recycle GIF');
  document.getElementById('results').append(loader);
}
function stopLoader() {
  let loader = document.getElementById('results');
  loader.parentNode.removeChild(loader);
}
function stopResults() {
  let results = document.getElementById('results2');
  results.parentNode.removeChild(results);
}
function confettiFunc() {
  let confetti = document.createElement('img');
  // put the image in the correct div
  confetti.setAttribute('src', './img/confetti.gif');
  confetti.setAttribute('height', '100%');
  confetti.setAttribute('width', '100%');
  confetti = document.getElementById('results3').parentNode.append(confetti);
  // setTimeout(function () {
  //   window.location.reload();
  // }, 3000);
  // console.log(stopLoader());
}
function noConfettiFunc() {
  confetti = document.getElementById('results3');
  confetti.remove();
  setTimeout(function () {
    window.location.reload();
  }, 1);
  // console.log(stopLoader());
}
function toggleLike() {
  if ((likeBoxVar = likeBox.classList.contains('fa-regular'))) {
    likeBox.classList.remove('fa-regular');
    likeBox.classList.add('fa-solid');
    likeBoxVar === true ? confettiFunc() : noConfettiFunc();
    console.log(likeBoxVar);
    stopLoader();
    stopResults();
  } else {
    likeBox.classList.add('fa-regular');
    likeBox.classList.remove('fa-solid');
    likeBoxVar === false ? noConfettiFunc() : confettiFunc();
    stopLoader();
    stopResults();
    return false;
  }
}

// SERVER REQUEST
function getRecyclableData() {
  fetch(`http://localhost:3000/canBeRecycled/`)
    .then((resp) => resp.json())
    .then((data) => {
      whiteList = data;

      const whiteListValue = whiteList.find((el) =>
        el.name.includes(textValue.toLowerCase())
      );

      console.log('textValue:', textValue);
      console.log('is my text value in the whiteList:', whiteListValue);
      console.log(!!whiteListValue);
      if (!!whiteListValue) {
        console.log(whiteList);

        setTimeout(function () {
          stopLoader();
        }, 2000);
        setTimeout(function () {
          showMatch();
        }, 2100);
        function showMatch() {
          {
            let yesImage = document.createElement('img');

            yesImage.setAttribute('src', './img/yesImage.gif');
            yesImage.setAttribute('height', '400px');
            yesImage.setAttribute('width', '400px');
            yesImage.setAttribute('alt', 'Planet Earth');

            confetti = document.getElementById('results3');
            confetti.remove();
            yesImage = document
              .getElementById('results2')
              .parentNode.append(yesImage);
          }
        }
        setTimeout(function () {
          window.location.reload();
        }, 6000);
      } else {
        setTimeout(function () {
          stopLoader();
        }, 2000);
        setTimeout(function () {
          showNoMatch();
        }, 2100);
        function showNoMatch() {
          {
            let noImage = document.createElement('img');

            noImage.setAttribute('src', './img/noImage.gif');
            noImage.setAttribute('height', '400px');
            noImage.setAttribute('width', '400px');
            noImage.setAttribute('alt', 'Trash Monster');

            noImage = document
              .getElementById('results2')
              .parentNode.append(noImage);
            confetti = document.getElementById('results3');
            confetti.remove();
          }
        }
        setTimeout(function () {
          window.location.reload();
        }, 6000);
        console.log(whiteListValue);
      }
    });
}

// FORM
function submitForm(e) {
  e.preventDefault();
  getRecyclableData();

  document.querySelector('#submit').disabled = true;
  textValue = document.getElementById('text').value;
  console.log(getRecyclableData);
}
