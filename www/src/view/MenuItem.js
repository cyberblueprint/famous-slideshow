define(function(require, exports, module) {
	var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface  = require('famous/surfaces/ImageSurface');

    MenuItem.prototype = Object.create(View.prototype);
    MenuItem.prototype.constructor = MenuItem;

    MenuItem.DEFAULT_OPTIONS = {
    	width: 320,
	    height: 55,
	    angle: -0.2,
	    iconSize: 32,
	    iconUrl: 'img/strip-icons/famous.png',
	    title: 'Famo.us',
	    fontSize: 26,
    };

    function MenuItem() {
        View.apply(this, arguments);

        _createBackground.call(this);
        _createIcon.call(this);
        _createTitle.call(this);
    }

    function _createBackground() {
	    var backgroundSurface = new Surface({
	        size: [this.options.width, this.options.height],
	        properties: {
	            backgroundColor: 'black',
	            // on certain devices, a skewed surface can have jagged edges
	            // the 1px box-shadow provides some anti-aliasing to soften this
	            boxShadow: '0 0 1px rgba(0,0,0,1)',
	        }
	    });

	    var rotateModifier = new StateModifier({
	        transform: Transform.rotateZ(this.options.angle)
	    });

	    var skewModifier = new StateModifier({
	        transform: Transform.skew(0, 0, this.options.angle)
	    });

	    // we're first skewing our surface then rotating it
	    this.add(rotateModifier).add(skewModifier).add(backgroundSurface);
	}

	function _createIcon() {
	    var iconSurface = new ImageSurface({
	        size: [this.options.iconSize, this.options.iconSize],
	        content : this.options.iconUrl,
	        properties: {
	            pointerEvents : 'none'
	        }
	    });

	    var iconModifier = new StateModifier({
	        // places the icon in the proper location
	        transform: Transform.translate(24, 2, 0)
	    });

	    this.add(iconModifier).add(iconSurface);
	}

	function _createTitle() {
	    var titleSurface = new Surface({
	        size: [true, true],
	        content: this.options.title,
	        properties: {
	            color: 'white',
	            fontSize: this.options.fontSize + 'px',
	            textTransform: 'uppercase',
	            pointerEvents : 'none'
	        }
	    });

	    var titleModifier = new StateModifier({
	        transform: Transform.thenMove(Transform.rotateZ(this.options.angle), [75, -5, 0])
	    });

	    this.add(titleModifier).add(titleSurface);
	}

    module.exports = MenuItem;
});