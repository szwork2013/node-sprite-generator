'use strict';

module.exports = function (name, suffix, additionalTests) {
    var path = require('path'),
        testUtils = require('../../utils/test.js'),
        stylesheetGenerator = require('../../../lib/stylesheet/' + name + '.js');

    describe('Stylesheet/' + name, function () {
        if (!suffix) {
            suffix = name;
        }

        var layout = {
                width: 150,
                height: 156,
                images: [
                    { path: '/bla/foo.png', x: 0, y: 0, width: 150, height: 12 },
                    { path: '/foo/bar.png', x: 0, y: 12, width: 150, height: 24 },
                    { path: '/images/test.png', x: 0, y: 36, width: 150, height: 12 }
                ]
            };

        it('should generate the correct ' + name + ' without any options', function (done) {
            var expectedStylesheetPath = 'test/fixtures/stylesheets/' + name + '/no-options.' + suffix;
            testUtils.testStylesheetGeneration(stylesheetGenerator, layout, expectedStylesheetPath, {}, done);
        });

        it('should generate the correct ' + name + ' with a prefix specified', function (done) {
            var expectedStylesheetPath = 'test/fixtures/stylesheets/' + name + '/with-prefix.' + suffix;
            testUtils.testStylesheetGeneration(stylesheetGenerator, layout, expectedStylesheetPath, { prefix: 'prefix-' }, done);
        });

        it('should generate the correct ' + name + ' with a spritePath specified', function (done) {
            var expectedStylesheetPath = 'test/fixtures/stylesheets/' + name + '/with-spritePath.' + suffix;
            testUtils.testStylesheetGeneration(stylesheetGenerator, layout, expectedStylesheetPath, { spritePath: '/this/is/my/spritepath.png' }, done);
        });

        it('should generate the correct ' + name + ' with a custom nameMapping specified', function (done) {
            var expectedStylesheetPath = 'test/fixtures/stylesheets/' + name + '/with-nameMapping.' + suffix,
                nameMapping = function (imagePath) {
                    return path.basename(imagePath, path.extname(imagePath)).split('').reverse().join('');
                };
            testUtils.testStylesheetGeneration(stylesheetGenerator, layout, expectedStylesheetPath, { nameMapping: nameMapping }, done);
        });

        it('should generate the correct ' + name + ' with a pixelRatio specified', function (done) {
            var expectedStylesheetPath = 'test/fixtures/stylesheets/' + name + '/with-pixelRatio.' + suffix;
            testUtils.testStylesheetGeneration(stylesheetGenerator, layout, expectedStylesheetPath, { pixelRatio: 2 }, done);
        });

        if (additionalTests) {
            additionalTests();
        }
    });
};
