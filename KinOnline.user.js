// ==UserScript==
// @name         KinOnline
// @namespace    kinonline
// @version      1.0.3
// @description  Watch on Kinopoisk for free!
// @author       StaticHUN
// @match        *://www.kinopoisk.ru/*/*
// @grant        none
// ==/UserScript==

function checkPage(url) {
    const element = document.querySelector(`[data-tid="fe27f3c4"]`); //fe27f3c4 - poster; cc89b13d - trailer

    const posterLink = element.querySelector(`[class="styles_posterLink__C1HRc"]`);
    const posterImg = posterLink.querySelector(`[data-tid="d813cf42"]`);
    const coords = posterImg.getBoundingClientRect();

    let returnedObject = {};
    returnedObject.url = posterLink;
    returnedObject.x = coords.left;
    returnedObject.y = coords.top;
    returnedObject.width = posterImg.width;
    returnedObject.height = posterImg.height;
    return returnedObject;
}

function addButton(url, x, y, w, h) {
    const button = document.createElement('div');
    button.id = 'btn';
    button.innerHTML = `<style>
	.button {
		font-family: "Graphik Kinopoisk LC Web",Arial,Tahoma,Verdana,sans-serif;
		font-size: 100%;
		font-size: 15px;
		font-weight: 500;
		color: #fff;
		background: #f60;
		cursor: pointer;
        padding: 5px;
        width: `+w+`px;
		position: absolute;
		border: none;
		border-radius: 3px;
	}
	.button:hover {
		background-color: #f25900
	}
</style>
<center>
	<button class="button" title="Cмотреть">Смотреть онлайн</button>
</center>`;
    button.style.position = 'absolute';
    button.style.zIndex = '694194';
    button.style.top = y-28+'px';
    button.style.left = x+'px';
    const id = location.href.split('/')[4];
    const playerUrl = new URL('https://statichun.ru/videoPlayer.html');
    playerUrl.searchParams.set('id', id);

    button.addEventListener('click', () => window.open(playerUrl.toString(), 'displayWindow', 'width=667px,height=377px'));
    //button.addEventListener('click', () => window.open(playerUrl.toString(), '_blank').focus());
    document.body.appendChild(button);
}

let previousUrl = '';
const observer = new MutationObserver(function(mutations) {
    if (location.href !== previousUrl) {
        previousUrl = location.href;

        let returnValue = checkPage(location.href);
        if (returnValue.url.length !== 0) {
            addButton(returnValue.url, returnValue.x, returnValue.y, returnValue.width, returnValue.height);
        }
    }
});

observer.observe(document, {subtree: true, childList: true});
