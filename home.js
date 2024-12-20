// document.getElementById('changeColorButton').addEventListener('click', function() {

//     // Change the background color of the body
//     const img = document.getElementById('changepic');
//     img.src = "stablenew.jpg";
//     document.getElementById('changeColorButton').style.display = 'none'
//     document.getElementById('newchangeColorButton').style.display = 'block'
//     document.getElementById('before').innerHTML = "After";
// });
const img = document.getElementById("newpictures");
const img1 = document.getElementById("newpic");
document
  .getElementById("changeColorButton")
  .addEventListener("click", function () {
    img.style.display = "none";
    img1.style.display = "block";
    img.style.backgroundImage = "url(./stablenew.jpg)";
    document.getElementById("changeColorButton").style.display = "none";
    document.getElementById("newchangeColorButton").style.display = "block";
    document.getElementById("before").innerHTML = "After";
  });

document
  .getElementById("newchangeColorButton")
  .addEventListener("click", function () {
    img.style.display = "block";
    img1.style.display = "none";
    document.getElementById("newpictures").style.backgroundImage =
      "url(./watchl.png)";
    document.getElementById("changeColorButton").style.display = "block";
    document.getElementById("newchangeColorButton").style.display = "none";
    document.getElementById("before").innerHTML = "Before";
  });
document.getElementById("ham").addEventListener("click", function (params) {});

let displayValues = document.querySelectorAll("#num");
let interval = 7000;
console.log(displayValues);
displayValues.forEach((displayValues) => {
  let start = 0;
  let end = parseInt(displayValues.getAttribute("data-val"));
  let duration = Math.floor(interval / end);
  let counter = setInterval(function () {
    start += 1;
    displayValues.textContent = start;
    if (start == end) {
      clearInterval(counter);
    }
  }, duration);
});
