/**
 * Created by vlad on 6/21/16.
 */

var ModalWindow = (function () {

    function _ModalWindow(text, id) {
        this.element = document.getElementById(id);
        this.element.getElementsByClassName('modal-text')[0].innerHTML = text;
        this.closeBtn = this.element.getElementsByClassName('close')[0];
        this.closeBtn.addEventListener('click', this.close.bind(this));
    }

    _ModalWindow.prototype.show = function () {
        this.element.classList.add('active');
    };

    _ModalWindow.prototype.close = function () {
        this.element.classList.remove('active');
    };

    return _ModalWindow;

})();

var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan id odio vel consequat. Maecenas mi nisl, volutpat ut ligula posuere, luctus condimentum dui. Sed vehicula nunc eget justo";
var modal = new ModalWindow(text, 'myModal');

document.getElementById('showModal').onclick = function () {
    modal.show();
};
