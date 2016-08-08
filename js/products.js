/**
 * Created by vlad on 6/20/16.
 */
var extend = function (child, parent) {
    for (var key in parent) {
        if (parent.hasOwnProperty(key)) {
            child[key] = parent[key];
        }
    }

    function ctor() {
        this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
};

var Product = (function () {

    function _Product(name, price, vipProduct) {
        this.name = name;
        this.price = price;
        this.vipProduct = vipProduct;
    }

    return _Product;
})();

var Cart = (function () {

    function _Cart(products) {
        this.products = products;
    }

    //asc, desc
    _Cart.prototype.sortBy = function (key, direction) {
        if (direction == 'asc') {
            return this.products.sort(function (a, b) {
                return +(a[key] > b[key]) || +(a[key] === b[key]) - 1;
            });
        } else {
            return this.products.sort(function (a, b) {
                return +(a[key] < b[key]) || +(a[key] === b[key]) - 1;
            });
        }


    };

    _Cart.prototype.searchBy = function (name) {
        var resultArray = [];
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i]['name'] == name) {
                resultArray.push(this.products[i]);
            }
        }
        return resultArray;
    };

    _Cart.prototype.calculateTotalPrice = function () {
        var totalPrice = 0;
        for (var i = 0; i < this.products.length; i++) {
            totalPrice += this.products[i]['price'];
        }
        return totalPrice;
    };

    return _Cart;
})();

var VipCart = (function (Cart) {

    extend(_VipCart, Cart);

    function _VipCart(products) {
        _VipCart.__super__.constructor.apply(this, arguments);
        this.products = getVipProducts(this.products);
    }

    /**
     * инкапсуляция
     * метод используется только в этом классе, для фильтрации вип продуктов
     */
    var getVipProducts = function (products) {
        var vipProducts = [];
        for (var i = 0; i < products.length; i++) {
            if (products[i]['vipProduct']) vipProducts.push(products[i]);
        }
        return vipProducts;
    };

    /**
     * полиморфизм
     * переопределяем метод родителя
     */
    _VipCart.prototype.calculateTotalPrice = function () {
        var totalPrice = _VipCart.__super__.calculateTotalPrice.apply(this);
        var doubleTotalPrice = 2 * totalPrice;
        return doubleTotalPrice;
    };

    return _VipCart;
})(Cart);


var prod1 = new Product('milk', 13, false);
var prod2 = new Product('bread', 6, false);
var prod3 = new Product('cheese', 120, true);
var prod4 = new Product('meat', 80, true);
var prod5 = new Product('milk', 15, false);


var cartManager = new Cart([prod1, prod2, prod3, prod4, prod5]);
var sortArr = cartManager.sortBy('price', 'asc');
var searchArr = cartManager.searchBy('milk');
var totalPrice = cartManager.calculateTotalPrice();
//console.log(sortArr);

var vipCartManager = new VipCart([prod1, prod2, prod3, prod4, prod5]);
var totalPriceVip = vipCartManager.calculateTotalPrice();
//console.log(totalPriceVip);
