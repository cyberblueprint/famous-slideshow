define(function(require, exports, module) {
     var View          = require('famous/core/View');
     var Surface       = require('famous/core/Surface');
     var Transform     = require('famous/core/Transform');
     var StateModifier = require('famous/modifiers/StateModifier');
 
     var PageView = require('view/PageView');
     var DataValues = require('data/DataValues');

     var Easing = require('famous/transitions/Easing');
     var Menu = require('view/Menu');

     var ItemData = require('data/ItemData');

	var GenericSync     = require('famous/inputs/GenericSync');
    var MouseSync       = require('famous/inputs/MouseSync');
    var TouchSync       = require('famous/inputs/TouchSync');
    GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});
    var Transitionable  = require('famous/transitions/Transitionable');

	var Modifier       = require('famous/core/Modifier');
	var Transitionable  = require('famous/transitions/Transitionable');

     function AppView() {
         View.apply(this, arguments);

         this.menuToggle = false;
         this.pageViewPos = new Transitionable(0);
 
         _createPageView.call(this);
         _createMenu.call(this);
         _setListeners.call(this);
         _handleSwipe.call(this);

     }
 
     AppView.prototype = Object.create(View.prototype);
     AppView.prototype.constructor = AppView;
 
     AppView.DEFAULT_OPTIONS = {
     	data: undefined,
     	openPosition: 276,
         transition: {
             duration: 450,
             curve: Easing.inOutBack
         }
     };
     
     function _createPageView() {
         this.pageView = new PageView({ data: DataValues});
         this.pageModifier = new Modifier({
            transform: function() {
                return Transform.translate(this.pageViewPos.get(), 0, 0);
            }.bind(this)
        });
 
         this.add(this.pageModifier).add(this.pageView);
     }

     function _createMenu() {
         this.menu = new Menu({ itemData: ItemData });
 
         var menuModifier = new StateModifier({
             transform: Transform.behind
         });
 
         this.add(menuModifier).add(this.menu);
     }
 


     function _setListeners () {
        this.pageView.on('menuToggle', this.toggleMenu.bind(this));
     }

     function _handleSwipe() {
        var sync = new GenericSync(
            ['mouse', 'touch'],
            {direction : GenericSync.DIRECTION_X}
        );

        this.pageView.pipe(sync);

        sync.on('update', function(data) {
            this.pageViewPos += data.delta;
            this.pageModifier.setTransform(Transform.translate(this.pageViewPos, 0, 0));
        }.bind(this));
    }



     AppView.prototype.toggleMenu = function() {
         if(this.menuToggle) {
             this.slideLeft();
         } else {
             this.slideRight();
         }
         this.menuToggle = !this.menuToggle;
     };
 
     AppView.prototype.slideRight = function() {
     	this.pageViewPos.set(this.options.openPosition, this.options.transition, function() {
            this.menuToggle = true;
        }.bind(this));
     };
 
     AppView.prototype.slideLeft = function() {
     	this.pageViewPos.set(0, this.options.transition, function() {
            this.menuToggle = false;
        }.bind(this));
     };
 
 
     module.exports = AppView;
 });
