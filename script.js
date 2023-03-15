'use strict';

let formName = document.querySelector('#name');
let formMessage = document.querySelector('#message');
let nameError = document.querySelector('.comments__form-text-error');
let textError = document.querySelector('.comments__form-message-error');
const form = document.querySelector('.comments__form');

formName.onblur = inputErrorOn;
formName.onfocus = textErrorOff;
formMessage.onblur = messageErrorOn;
formMessage.onfocus = textErrorOff;

let isError = false;

let comments = [];

loadComments();

function inputErrorOn() {
	if (formName.value == 'undefined' || formName.value.length < 2) {
		formName.classList.add('invalid');
		nameError.style.opacity = 1;
		isError = true;
	}
}

function messageErrorOn() {
	if (!formMessage || formMessage.value.length < 15) {
		formMessage.classList.add('invalid');
		textError.style.opacity = 1;
		isError = true;
	}
}

function textErrorOff() {
	if (this.classList.contains('invalid')) {
		this.classList.remove('invalid');
		if (!formName.classList.contains('invalid')) {
			nameError.style.opacity = 0;
		}
		if (!formMessage.classList.contains('invalid')) {
			textError.style.opacity = 0;
		}
	}
}

let date = document.querySelector('#date');
let today = new Date();
let currentMonth = today.getMonth() + 1;
let currentDate = today.getDate();

if (currentMonth < 10) {
	currentMonth = '0' + currentMonth;
}
if (currentDate < 10) {
	currentDate = '0' + currentDate;
}

let todayDate = today.getFullYear() + '-' + currentMonth + '-' + currentDate;

date.setAttribute('max', todayDate);

function getDateComment() {
	let dateComment = todayDate;

	if (!date.value) {
		date.value = dateComment;
	}
	if (date.value == todayDate) {
		dateComment = 'Сегодня';
		return dateComment;
	}

	let yesterday = new Date(Date.now() - 86400000);
	let yesterdayMonth = yesterday.getMonth() + 1;
	let yesterdaytDate = yesterday.getDate();

	if (yesterdayMonth < 10) {
		yesterdayMonth = '0' + yesterdayMonth;
	}
	if (yesterdaytDate < 10) {
		yesterdaytDate = '0' + yesterdaytDate;
	}

	let yesterdaytCurrDate = yesterday.getFullYear() + '-' + yesterdayMonth + '-' + yesterdaytDate;
	if (date.value == yesterdaytCurrDate) {
		dateComment = 'Вчера';
		return dateComment;
	}
	dateComment = date.value;
	return dateComment;
}

function getTimeComment() {
	return today.getHours() + ':' + today.getMinutes();
}

let btnsLike = document.querySelectorAll('.comments__box-like');

function changeLike() {
	btnsLike = document.querySelectorAll('.comments__box-like');

	btnsLike.forEach((item) => {
		item.addEventListener('click', () => {
			item.classList.toggle('is-liked');
		});
	});
}

changeLike();

let btnsDelete = document.querySelectorAll('.comments__box-delete');

function deleteComment() {
	btnsDelete = document.querySelectorAll('.comments__box-delete');

	btnsDelete.forEach((item) => {
		item.addEventListener('click', () => {
			item.closest('.comments__box-item').remove();
		});
	});
}

deleteComment();

form.addEventListener('submit', (event) => {
	event.preventDefault();

	inputErrorOn();
	messageErrorOn();

	if (!isError) {
		let comment = {
			name: formName.value,
			date: getDateComment(),
			time: getTimeComment(),
			text: formMessage.value,
		};
		comments.push(comment);
		formName.value = '';
		formMessage.value = '';
		saveComments();
		renderComments();
		changeLike();
		deleteComment();
	}
});

function saveComments() {
	localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
	if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
	renderComments();
}

function renderComments() {
	const commentsBox = document.querySelector('.comments__box');

	commentsBox.innerHTML = comments
		.map((item) => {
			return `<div class="comments__box-item">
    <div class="comments__box-item-top">
      <div class="comments__box-name">${item.name}</div>
      <div class="comments__box-date">
        <span class="comments__box-date-day">${item.date}</span>
        <span class="comments__box-date-time">${item.time}</span>
      </div>
    </div>
    <div class="comments__box-item-text">${item.text}</div>
    <div class="comments__box-item-bottom">
      <button class="comments__box-like">
        <svg width="25px" height="25px" viewBox="0 -3.71 75.17 75.17" xmlns="http://www.w3.org/2000/svg"
          class="comments__box-item-svg-like">
          <path id="Path_1" data-name="Path 1"
            d="M117.606,280.375s22.263-15.459,31.959-30.318c9.6-14.708.354-31.054-10.533-33.8-14.457-3.65-21.426,10.478-21.426,10.478s-6.968-14.128-21.425-10.478c-10.888,2.748-20.132,19.094-10.534,33.8C95.343,264.916,117.606,280.375,117.606,280.375Z"
            transform="translate(-80.021 -214.131)" fill="none" stroke="#000000" stroke-linejoin="round"
            stroke-width="3" />
        </svg>
      </button>
      <button class="comments__box-delete">
        <svg height="25px" width="25px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
          <style type="text/css">
            .st0 {
              fill: #000000;
            }
          </style>
          <g>
            <path class="st0" d="M410.889,43.919H301.535C299.775,19.787,280.578,0.08,255.994,0c-24.591,0.08-43.786,19.787-45.549,43.919
H101.112c-22.791,0-41.408,18.633-41.408,41.4v32.156c0,5.692,4.65,10.35,10.338,10.35h0.678l23.856,342.881
C96.151,493.408,116.064,512,138.855,512h234.283c22.759,0,42.7-18.592,44.286-41.295l23.836-342.881h0.678
c5.696,0,10.358-4.658,10.358-10.35V85.318C452.296,62.552,433.659,43.919,410.889,43.919z M146.884,319.686
c-4.316-6.895-2.322-16.817,1.562-23.59c2.411-4.23,13.337-22.589,13.337-22.589l-18.318-10.818l51.399-0.113l25.931,44.952
l-19.065-11.012l-23.28,40.98h0.021c-4.396,7.847-8.32,15.016-8.53,22.718C159.942,342.856,147.542,320.768,146.884,319.686z
M243.004,384.628c-6.192-0.049-26.94-0.194-32.151-0.098c-23.857,0.42-29.993-5.376-32.543-9.784
c-0.529-0.937-1.086-1.89-1.644-2.851c-6.782-11.755-0.965-22.121,5.898-34.351l60.74,0.419L243.004,384.628z M223.523,258.458
l-40.246-23.606c3.128-5.329,13.628-23.227,16.15-27.78c11.553-20.878,19.663-23.292,24.741-23.292h3.286
c13.579,0,19.646,10.221,26.827,22.283L223.523,258.458z M256.353,202.502l-0.02,0.04c-4.582-7.735-8.836-14.71-15.388-18.746
c20.03,0.016,45.38,0.323,46.627,0.291c8.126-0.275,15.727,6.402,19.65,13.159c2.43,4.182,12.901,22.848,12.901,22.848
l18.517-10.463l-25.601,44.564h-51.895l19.077-11.012L256.353,202.502z M334.668,374.035c-3.834,7.193-13.398,10.415-21.217,10.447
c-4.852,0.024-26.23-0.242-26.23-0.242l-0.218,21.266l-25.79-44.452l25.951-44.952v22.024l47.152-0.34l-0.007-0.016
c8.973-0.114,17.163-0.299,23.916-3.956C348.203,351.123,335.266,372.938,334.668,374.035z M366.643,319.283
c-0.549,0.952-1.098,1.904-1.655,2.874c-6.794,11.738-18.678,11.884-32.701,12.062l-29.992-52.832l40.561-23.058
c3.06,5.394,13.308,23.42,15.977,27.893C371.136,306.664,369.174,314.89,366.643,319.283z" />
          </g>
        </svg>
      </button>
    </div>
  </div>`;
		})
		.join('');
}
