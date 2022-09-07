// ==UserScript==
// @name         KinOnline
// @namespace    kinonline
// @version      0.5.1
// @description  Watch on Kinopoisk for free!
// @author       StaticHUN
// @match        *://www.kinopoisk.ru/*/*
// @grant        none
// ==/UserScript==

function init() {
    let art = document.querySelector(`span[data-tid="6cb8d12f"]`);
    let nosubscription = document.querySelector(`div[class="styles_subscriptionText__xEiOR"]`);
    if ((art === null) || (art.textContent === 'Купить и смотреть') || (nosubscription.textContent.length !== null)) {
        let element = document.querySelector(`div[data-tid="fe27f3c4"]`);//fe27f3c4 - poster; cc89b13d - trailer
        if (element.length !== 0) {
            let coords = element.getBoundingClientRect();

            const type = window.location.href.split('/')[3];
            if (type === 'film' || type === 'series') {
                const id = window.location.href.split('/')[4];
                if (id) {
                    const url = new URL('https://statichun.ru/videoPlayer.html');
                    url.searchParams.set('id', id);

                    const button = document.createElement('div');
                    button.id = 'btn';
                    button.innerHTML = `<style>.button {font-family: "Graphik Kinopoisk LC Web",Arial,Tahoma,Verdana,sans-serif; font-size: 100%; font-size: 15px; font-weight: 500; color: #fff; background: #f60; cursor: pointer; padding: 8px 86px; position: absolute; border: none; border-radius: 3px;} .button:hover {background-color: #f25900}</style><center><button class="button" title="Cмотреть">Смотреть онлайн</button></center>`;
                    button.style.position = 'absolute';
                    button.style.zIndex = '1';
                    button.style.width = '100%';
                    button.style.top = coords.top - 1 + 'px';
                    button.style.left = '-590px';
                    button.style.minWidth = '1200px';
                    const w = 1280, h = 720, l = Number((screen.width/2)-(w/2)-16), t = Number((screen.height/2)-(h/2));
                    button.addEventListener('click', () => window.open(url.toString(), 'displayWindow', 'width='+w+',height='+h+',resizable=no,menubar=no,scrollbars=no,status=no,toolbar=no,location=no,left='+l+',top='+t));
                    document.body.appendChild(button);

                    new MutationObserver(function(mutations) {
                        if (button) button.remove();
                        init();
                    }).observe(document.querySelector('title'), { subtree: true, characterData: true, childList: true });
                }
            }
        }
    }
}

init();
