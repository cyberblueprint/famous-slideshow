define(function(require, exports, module) {
     var View = require('famous/core/View');
     var Surface = require('famous/core/Surface');
     var Transform = require('famous/core/Transform');
     var StateModifier = require('famous/modifiers/StateModifier');
 	 var HeaderFooter    = require('famous/views/HeaderFooterLayout');
     var ImageSurface    = require('famous/surfaces/ImageSurface');
     var FastClick       = require('famous/inputs/FastClick');
     var SlideView = require('view/SlideView');
     var ContainerSurface = require('famous/surfaces/ContainerSurface');

     function PageView() {
         View.apply(this, arguments);
 
         _createLayout.call(this);
         _createHeader.call(this);
         _createBody.call(this);
     }
 
     PageView.prototype = Object.create(View.prototype);
     PageView.prototype.constructor = PageView;
 
     PageView.DEFAULT_OPTIONS = {};
     PageView.DEFAULT_OPTIONS = {
         headerSize: 44
     };
 
     function _createLayout() {
         this.layout = new HeaderFooter({
             headerSize: this.options.headerSize
         });
 
         var layoutModifier = new StateModifier({
             transform: Transform.translate(0, 0, 0.1)
         });

         var back = new Surface({
         	properties: {
         		backgroundColor: 'black'
         	}
         });
 
         this.add(layoutModifier).add(this.layout)
         this.add(back);
     }

     function _createBody () {
        this.container = new ContainerSurface({
            properties: {
                overflow: 'hidden'
            }
        });

     	this.createLightbox = new SlideView({
     		data: this.options.data
     	});

        this.add(this.container);
     	this.add(this.createLightbox);
     }

     function _createHeader() {
        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'black'
            }
        });

        var backgroundModifier = new StateModifier({
            transform: Transform.behind
        });

        this.hamburgerSurface = new ImageSurface({
            size: [44, 44],
            content: 'img/hamburger.png'
        });

        var searchSurface = new ImageSurface({
            size: [232, 44],
            content: 'img/search.png'
        });

        var iconSurface = new ImageSurface({
            size: [44, 44],
            content: 'img/icon.png'
        });

        var hamburgerModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5]
        });

        var searchModifier = new StateModifier({
            origin: [0.5, 0.5],
            align : [0.5, 0.5]
        });

        var iconModifier = new StateModifier({
            origin: [1, 0.5],
            align : [1, 0.5]
        });

        this.layout.header.add(backgroundModifier).add(backgroundSurface);
        this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
        this.layout.header.add(searchModifier).add(searchSurface);
        this.layout.header.add(iconModifier).add(iconSurface);
    }
 
     module.exports = PageView;
 });
