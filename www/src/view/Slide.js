define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var ImageSurface = require('famous/surfaces/ImageSurface');
    var DataValues = require('data/DataValues');

    Slide.prototype = Object.create(View.prototype);
    Slide.prototype.constructor = Slide;

    Slide.DEFAULT_OPTIONS = {
        size: [400, 450],
        filmBorder: 15,
        photoBorder: 3,
        photoUrl: DataValues.defaultImage
    };

    function Slide(options) {
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: this.options.size
        });

        this.mainNode = this.add(this.rootModifier);

        _createBackground.call(this);
        _createFilm.call(this);
        _createPhoto.call(this);
    }

    function _createBackground() {
        var background = new Surface({
            properties: {
                backgroundColor: 'black',
                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
            }
        });

        background.on('click', function() {
            // the event output handler is used to broadcast outwards
            this._eventOutput.emit('click');
        }.bind(this));

        this.mainNode.add(background);
    }

     function _createFilm() {
        this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder;

        var film = new Surface({
            size: [this.options.filmSize, this.options.filmSize],
            properties: {
                backgroundColor: '#222',
                zIndex: 1,
                pointerEvents: 'none'
            }
        });

        var filmModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0],
            transform: Transform.translate(0, this.options.filmBorder, 1)
        });

        this.mainNode.add(filmModifier).add(film);
    }

    function _createPhoto() {
        var photoSize = this.options.filmSize - 2 * this.options.photoBorder;

        var photo = new ImageSurface({
            size: [photoSize, photoSize],
            content: this.options.photoUrl,
            properties: {
                zIndex: 2,
                pointerEvents: 'none'
            }
        });

        this.photoModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0],
            transform: Transform.translate(0, this.options.filmBorder + this.options.photoBorder, 2)
        });

        this.mainNode.add(this.photoModifier).add(photo);
    }

    module.exports = Slide;
});