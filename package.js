Package.describe({
  name: 'fourq:typeahead',
  summary: 'Twitters typeahead',
  git: 'https://github.com/fourq/meteor-pkg-typeahead.git',
  version: '1.0.0'
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.4');
  api.addFiles('.npm/package/node_modules/typeahead.js/dist/typeahead.bundle.min.js', 'client');
  api.addFiles('.npm/package/node_modules/typeahead.js/dist/typeahead.jquery.min.js', 'client');
  api.addFiles('.npm/package/node_modules/typeahead.js/dist/bloodhound.min.js', 'client');
  api.addFiles('typeahead.js', 'client');
  api.export('Typeahead');
});

Npm.depends({
  'typeahead.js': '0.10.5'
});
