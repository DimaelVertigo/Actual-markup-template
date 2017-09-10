var btn = document.querySelector('.order-btn');
var form = document.querySelector('.contact-form');
var wrapper = document.querySelector('.wrapper');

btn.addEventListener('click', function () {
	form.classList.add('enabled');
	wrapper.classList.add('disabled');
});

document.onkeydown = function(evt) {
	evt = evt || window.event;
	if (evt.keyCode == 27) {
		removeClass(form, 'enabled');
		removeClass(wrapper, 'disabled');
	}
};

function removeClass(el, className) {
	if (el.classList)
		el.classList.remove(className)
	else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
		el.className=el.className.replace(reg, ' ')
	}
}