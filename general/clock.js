/*jshint maxerr: 1000 */
if (window.location.hostname == 'www.countdownlhs.ga') {
  alert('Drag me to your bookmarks bar. If I\'m already there, use me on another site!');
} else {
  document.body.appendChild(document.createElement('script')).src =
    'https://www.countdownlhs.ga/js/mobilebookmarklet.js';
  document.body.appendChild(document.createElement('script')).src =
    'https://www.countdownlhs.ga/js/code.js';
}
