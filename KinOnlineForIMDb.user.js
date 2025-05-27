// ==UserScript==
// @name         KinOnline for IMDb
// @namespace    kinonline
// @version      0.8
// @description  Watch on IMDb for free!
// @author       StaticHUN
// @match        *://www.imdb.com/title/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function extractIdFromUrl(url) {
        const match = url.match(/\/title\/(tt\d+)/);
        if (match && match[1]) {
            return match[1];
        } else {
            return null;
        }
    }

    function cloneAndAddButton() {
        let existingContainer = document.querySelector('div.ipc-split-button.ipc-btn--theme-baseAlt');

        if (existingContainer) {
            let newContainer = existingContainer.cloneNode(true);

            let watchlistButton = newContainer.querySelector('button[data-testid="tm-box-wl-button"]');
            if (watchlistButton) {
              let textElement = watchlistButton.querySelector('.ipc-btn__text');

                if (textElement) {
                    textElement.textContent = 'Watch online';
                    textElement.style.textAlign = 'center';
                    textElement.style.fontWeight = 'bold';
                } else {
                    console.warn("Could not find text element in watchlist button using more general selector.");
                }

                let countElement = watchlistButton.querySelector('.sc-a90f4598-3.bPZdi');
                if (countElement) {
                    countElement.remove();
                }

                let svgIcon = watchlistButton.querySelector('svg');
                if (svgIcon) {
                    svgIcon.remove();
                }

                watchlistButton.addEventListener('click', function() {
                    const id = extractIdFromUrl(location.href);
                    const playerUrl = new URL('https://statichun.ru/cinema');
                    playerUrl.searchParams.set('message', id);
                    window.open(playerUrl.toString());
                });

                const originalHeight = window.getComputedStyle(existingContainer).height;
                newContainer.style.height = originalHeight;

                watchlistButton.style.height = originalHeight;
                watchlistButton.style.lineHeight = originalHeight;
                watchlistButton.style.display = 'flex';
                watchlistButton.style.alignItems = 'center';
            } else {
                console.warn("Could not find 'Add to Watchlist' button in cloned container.");
            }

            let addToListButton = newContainer.querySelector('button[data-testid="tm-box-addtolist-button"]');
            if (addToListButton) {
                addToListButton.remove();
            } else {
                console.warn("Could not find 'Add to List' button in cloned container.");
            }

            newContainer.style.borderRadius = window.getComputedStyle(watchlistButton).borderRadius;
            newContainer.style.overflow = 'hidden';
            newContainer.style.display = 'block';
            newContainer.style.width = '100%';

            if (watchlistButton) {
                watchlistButton.style.marginRight = '0';
                watchlistButton.style.borderRight = 'none';
                watchlistButton.style.width = '100%';
            }
            newContainer.style.marginBottom = '10px';

            existingContainer.parentNode.insertBefore(newContainer, existingContainer);

            console.log('Cloned button added.');
        } else {
            console.warn('Could not find the existing button container.');
        }
    }

    setTimeout(cloneAndAddButton, 1000);
})();
