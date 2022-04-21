// HTML/CSS/JS access data from a public (can be local) API.

// GLOBAL VARIABLES
const button = document.getElementById('submit');
const topButton = document.getElementById('top-submit');
// console.log(button);
let whiteList, textValue;
// console.log(whiteList);
// const textValue = document.getElementById('text').value;
let likeBox = document.getElementById('likes');

// Your app needs to incorporate at least 1 event listener (DOMContentLoaded, click, change, submit, etc).

// Event Listeners
button.addEventListener('submit', submitForm);
button.addEventListener('click', startLoader);
// console.log(topButton);
// console.log(button);
// console.log(submitForm);
// console.log(startLoader);

// FUNCTIONS

// getRecyclableData();

// Create loading animation
// need to create a flex div for loader

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
// Some interactivity is required. This could be as simple as adding a "like" button or adding comments. These interactions do not need to persist after reloading the page

// create a "promise to recycle" button

// All interactions between the client and the API should be handled asynchronously and use JSON as the communication format.

// SERVER REQUESTS
//   create Fetch request
function getRecyclableData() {
  fetch(`http://localhost:3000/canBeRecycled/`)
    .then((resp) => resp.json())
    // console.log(resp.json())
    .then((data) => {
      // console.log(textValue);
      // data.forEach((obj) => {
      //   Object.entries(obj).forEach(([key, value]) => {
      //     console.log(`${key} ${value}`);
      //   });
      // });

      whiteList = data;
      // console.log(data);
      // console.log(whiteList);
      //   loop through array to compare with submit form input
      // use a function instead console
      //   Logic to compare form text value === whitelist data
      const whiteListValue = whiteList.find((el) =>
        el.name.includes(textValue.toLowerCase())
      );
      // console.log(whiteListValue);
      // (item) => item.toLowerCase() === textValue.toLowerCase()
      // );
      // console.log('whiteList:', whiteList);
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
            // put the image in the correct div
            yesImage.setAttribute('src', './img/yesImage.gif');
            yesImage.setAttribute('height', '400px');
            yesImage.setAttribute('width', '400px');
            yesImage.setAttribute('alt', 'Planet Earth');
            // console.log(stopLoader());
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
      } else if (whiteListValue !== textValue) {
        // console.log(whiteList);
        setTimeout(function () {
          stopLoader();
        }, 2000);
        setTimeout(function () {
          showNoMatch();
        }, 2100);
        function showNoMatch() {
          {
            let noImage = document.createElement('img');
            // put the image in the correct div
            noImage.setAttribute('src', './img/noImage.gif');
            noImage.setAttribute('height', '400px');
            noImage.setAttribute('width', '400px');
            noImage.setAttribute('alt', 'Trash Monster');
            // console.log(stopLoader());
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

// add function that rewards user
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

function submitForm(e) {
  e.preventDefault();
  getRecyclableData();

  document.querySelector('#submit').disabled = true;
  textValue = document.getElementById('text').value;
  console.log(getRecyclableData);
}
function submitTopForm(e) {
  e.preventDefault();
  // console.log(disable(button));
  topFormValue = document.getElementById('text').value;

  console.log(topFormValue);
}
