define(function(require, exports, module) {
     var View = require('famous/core/View');
     var Surface = require('famous/core/Surface');
     var Transform = require('famous/core/Transform');
     var StateModifier = require('famous/modifiers/StateModifier');
     var HeaderFooter    = require('famous/views/HeaderFooterLayout');
 
     function PageView() {
         View.apply(this, arguments);
 
         _createLayout.call(this);
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
 
         this.add(layoutModifier).add(this.layout);
     }

     function _createBody () {
     	this.bodywal  = new Surface({
     		content: 'Hello App',
     		size: [400, 450],
     		properties: {
	         	backgroundColor: 'black'
	         }
     	});

     	this.add(this.bodywal);
     }
 
     module.exports = PageView;
 });
