define(function(require, exports, module) {
     var View          = require('famous/core/View');
     var Surface       = require('famous/core/Surface');
     var Transform     = require('famous/core/Transform');
     var StateModifier = require('famous/modifiers/StateModifier');
 
     var PageView = require('view/PageView');
     var SlideView = require('view/SlideView');
 
     function AppView() {
         View.apply(this, arguments);
 
         _createPageView.call(this);
         _createBox.call(this);
     }
 
     AppView.prototype = Object.create(View.prototype);
     AppView.prototype.constructor = AppView;
 
     AppView.DEFAULT_OPTIONS = {
     	data: undefined
     };
 
     function _createPageView() {
         this.pageView = new PageView();
         this.pageModifier = new StateModifier();
 
         this.add(this.pageModifier).add(this.pageView);
     }

     function _createBox () {
     	this.createLightbox = new SlideView({
     		data: this.options.data
     	});

     	this.add(this.createLightbox);
     }
 
     module.exports = AppView;
 });
