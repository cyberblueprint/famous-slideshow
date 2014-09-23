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


     function AppView() {
         View.apply(this, arguments);

         this.menuToggle = false;
 
         _createPageView.call(this);
         _createMenu.call(this);
         _setListeners.call(this);

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
         this.pageModifier = new StateModifier();
 
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



     AppView.prototype.toggleMenu = function() {
         if(this.menuToggle) {
             this.slideLeft();
         } else {
             this.slideRight();
         }
         this.menuToggle = !this.menuToggle;
     };
 
     AppView.prototype.slideRight = function() {
         this.pageModifier.setTransform(Transform.translate(this.options.openPosition, 0, 0), this.options.transition);
     };
 
     AppView.prototype.slideLeft = function() {
         this.pageModifier.setTransform(Transform.translate(0, 0, 0), this.options.transition);
     };
 
 
     module.exports = AppView;
 });
