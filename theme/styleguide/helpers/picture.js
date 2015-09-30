 /**
 * {{#picture}} returns picture element markup
 * based on the two optional arguments
 *
 * @usage
 *   {{#picture args modifier_class="modifier" filename="filename"}}{{/picture}}
 *
 * @param modifier_class
 *   Additional classes applied to the image element
 * @param filename
 *   Filename to use. This assumes the filename will end
 *   with '--sm.jpg' and '--lg.jpg'. Example: if filename = test,
 *   out put would be 'test--sm.jpg'.
 *
 * @return html
 */

'use strict';

module.exports.register = function(handlebars) {
  handlebars.registerHelper('picture', function(arg, options) {
    var html = '';

    // grab optional arguments as key/value pairs
    if (options) {
      var modifier_class = options.hash['modifier_class'];
      var filename = options.hash['filename'];
      var type = options.hash['type'];
      var alt = options.hash['alt'];
      var size = options.hash['size'];
    }

    // default filetype if not supplied
    if (type == undefined) {
      var type = 'jpg';
    }

    // make alt empty if not used, wrap with attribute if otherwise
    if (alt == undefined) {
      var alt = '';
    }
    else {
      alt = ' alt="' + alt + '"';
    }

    if (size == undefined) {
      var size = '640x480';
    }

    // add surrounding div and picture elements
    html += '<div class="picture__image';

    // add the modifier_class to the classes if it exists
    if (modifier_class) {
      html += ' ' + modifier_class;
    }
    html += '"><picture>';

    // use custom filename if it exists
    if (filename) {
      html += '<source srcset="/rapid-mockups-kss-node/theme/assets/dist/images/' + filename + '--lg.' + type + '" media="(min-width: 768px)">';
      html += '<img src="/rapid-mockups-kss-node/theme/assets/dist/images/' + filename + '--sm.' + type + '"' + alt + '>';
    }
    // placehold.it fallback if there's no filename
    else {
      html += '<source srcset="http://placehold.it/' + size + '" media="(min-width: 768px)">';
      html += '<img src="http://placehold.it/' + size + '" ' + alt + '>';
    }

    // close picture and div
    html += '</picture></div>';

    // escape and return
    return new handlebars.SafeString(html);
  });
};