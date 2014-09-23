define(function(require, exports, module) {
	var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
    var MenuItem = require('view/MenuItem');

    Menu.prototype = Object.create(View.prototype);
    Menu.prototype.constructor = Menu;

    Menu.DEFAULT_OPTIONS = {
    	itemData: {},
        angle: -0.2,
        stripWidth: 320,
        stripHeight: 54,
        topOffset: 37,
        stripOffset: 58,
        staggerDelay: 35,
        transition: {
            duration: 400,
        }
    };

    function Menu() {
        View.apply(this, arguments);

        _createMenuItems.call(this);
    }

    function _createMenuItems() {
        this.menuItemModifier = [];
        var yOffset = this.options.topOffset;

        for (var i = 0; i < this.options.itemData.length; i++) {
            var menuItem = new MenuItem({
                iconUrl: this.options.itemData[i].iconUrl,
                title: this.options.itemData[i].title
            });

            var stripModifier = new StateModifier({
                transform: Transform.translate(0, yOffset, 0)
            });

            this.menuItemModifier.push(stripModifier);
            this.add(stripModifier).add(menuItem);

            yOffset += this.options.stripOffset;
        }
    }

    Menu.prototype.resetItems = function() {
        for(var i = 0; i < this.menuItemModifier.length; i++) {
            var initX = -this.options.stripWidth;
            var initY = this.options.topOffset
                + this.options.stripOffset * i
                + this.options.stripWidth * Math.tan(-this.options.angle);

            this.menuItemModifier[i].setTransform(Transform.translate(initX, initY, 0));
        }
    };

    Menu.prototype.animateItems = function() {
        this.resetItems();

        var transition = this.options.transition;
        var delay = this.options.staggerDelay;
        var stripOffset = this.options.stripOffset;
        var topOffset = this.options.topOffset;

        for(var i = 0; i < this.menuItemModifier.length; i++) {
            Timer.setTimeout(function(i) {
                var yOffset = topOffset + stripOffset * i;

                this.menuItemModifier[i].setTransform(
                    Transform.translate( 0, yOffset, 0), transition);
            }.bind(this, i), i * delay);
        }
    };

    module.exports = Menu;
});