// ==UserScript==
// @name         KinOnline
// @namespace    kinonline
// @version      0.1
// @description  Watch on Kinopoisk for free!
// @author       StaticHUN
// @match        *://www.kinopoisk.ru/*/*
// @grant        none
// ==/UserScript==

function init() {
  const type = window.location.href.split('/')[3];
  if (type === 'film' || type === 'series') {
    const id = window.location.href.split('/')[4];
    if (id) {
      const url = new URL('https://statichun.ru/videoPlayer.html');
      url.searchParams.set('id', id);

      const button = document.createElement('div');
      button.id = 'btn';
      button.innerHTML = `<style>.button {font-family: "Graphik Kinopoisk LC Web",Arial,Tahoma,Verdana,sans-serif; font-size: 100%; font-size: 15px; color: #fff; background: #f60; cursor: pointer; padding: 8px 115.5px; position: absolute; border: none; border-radius: 6px;} .button:hover {background-color: #f25900}</style><center><button class="button" title="Cмотреть">Смотреть</button></center>`;
      button.style.position = 'absolute';
      button.style.zIndex = '1';
      button.style.width = '100%';
      button.style.top = '153px';
      button.style.left = '-590px';
      button.style.minWidth = '1280px';
      button.addEventListener('click', () => window.open(url.toString(), '_blank').focus());
      document.body.appendChild(button);
    }
  }
}

window.addEventListener('load', init);
