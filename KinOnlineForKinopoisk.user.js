// ==UserScript==
// @name         KinOnline for Kinopoisk
// @namespace    kinonline
// @version      1.0.7
// @description  Watch on Kinopoisk for free!
// @author       StaticHUN
// @match        *://www.kinopoisk.ru/film/*
// @match        *://www.kinopoisk.ru/series/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function extractIdFromUrl(url) {
        const match = url.match(/\/(film|series)\/(\d+)\//);
        if (match && match[2]) {
            return parseInt(match[2]);
        } else {
            return null;
        }
    }

    function addCustomButton() {
        let posterContainer = document.querySelector('div.styles_posterContainer__F02wH');

        if (posterContainer) {
            let newButton = document.createElement('button');
            newButton.textContent = 'Смотреть онлайн';
            newButton.addEventListener('click', function() {
                const id = extractIdFromUrl(location.href);
                const playerUrl = new URL('https://statichun.ru/cinema');
                playerUrl.searchParams.set('message', id);
                window.open(playerUrl.toString());
            });
            newButton.classList.add('button');
            newButton.style.marginBottom = '10px';

            posterContainer.parentNode.insertBefore(newButton, posterContainer);

            console.log('Custom button added above the poster.');
        } else {
            console.warn('Could not find the poster container.');
        }
    }

    function addGlobalStyle(css) {
        var head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle(`
        .button {
            color: #fff;
            background: #f60;
            cursor: pointer;
            border: none;
            border-radius: 3px;
            padding: 8px 12px;
        }
        .button:hover {
            background-color: #f25900
        }
    `);

    setTimeout(addCustomButton, 1000);
})();
