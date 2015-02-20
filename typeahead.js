Typeahead = function() {};

Typeahead.compile = function (templateName) {
  return function (context) {
    var div = $('<div/>');
    Blaze.renderWithData(Template[templateName], context, div[0]);
    return div.html();
  };
};
