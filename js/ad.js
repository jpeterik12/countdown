/* eslint-disable no-unused-vars */
function ad() {
  const x = document.createElement('img');
  x.src = '/images/ads/ad2.png';
  x.style.height = '80vh';
  x.style.width = '20vw';
  x.style.objectFit = 'contain';
  x.style.zIndex = '2147483647';
  x.style.display = 'block';
//   x.onload = yeet;
  x.style.position = 'absolute';
  x.style.top = '0';
  x.style.left = '55vw'
  document.body.appendChild(x);

  function deleteMe(element) {
    element.parentNode.removeChild(element);
  }

  function yeet() {
    setTimeout(deleteMe, 6000, x);
  }
}
