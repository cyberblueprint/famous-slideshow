define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var AppView = require('view/AppView');
    var data = require('data/DataValues');
    

    var mainContext = Engine.createContext();
    var appView = new AppView({ data: data });

    

    mainContext.add(appView);
});