define(function(require, exports, module) {
     var View          = require('famous/core/View');
     var Surface       = require('famous/core/Surface');
     var Transform     = require('famous/core/Transform');
     var StateModifier = require('famous/modifiers/StateModifier');
 
     var PageView = require('view/PageView');
     var DataValues = require('data/DataValues');

     function AppView() {
         View.apply(this, arguments);
 
         _createPageView.call(this);
     }
 
     AppView.prototype = Object.create(View.prototype);
     AppView.prototype.constructor = AppView;
 
     AppView.DEFAULT_OPTIONS = {
     	data: undefined
     };
 
     function _createPageView() {
         this.pageView = new PageView({ data: DataValues});
         this.pageModifier = new StateModifier();
 
         this.add(this.pageModifier).add(this.pageView);
     }

     
 
     module.exports = AppView;
 });
