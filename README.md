# fourq:typeahead

A simple package to expose twitters typeahead component.


## Install

```sh
meteor add fourq:typeahead
```

## Usage

Working project example.

```html
<template name="something">
  <!-- The hidden field here is just to capture the selected id -->
  <input class="typeahead" name="organization" id="organization" type="text" value="{{organization}}"/>
  <input type="hidden" name="organizationId" id="organizationId" value="{{organizationId}}"/>
</template>


<!-- Meteor template to display typeahead suggestions -->
<!-- City, state, and value come from the Typeahead.compile() context -->
<template name="organizationSuggestion">
  <p class="organization-name">{{value}}</p>
  <font size='-1'>{{city}}{{#if state}}, {{/if}}{{state}}</font>
</template>


<!-- Meteor template to display when there are no records found -->
<template name="organizationNoRecords">
  <p class="organization-name">no records found</p>
</template>
```

```javascript
/*
  *Everything is configured in javascript.

  *Typeahead.compile is responsible for rendering the Meteor templates above.

  *Sidenote, debounce your source! Checkout the Underscore docs if you're not familiar.
*/
Template.profile.onRendered = function () {

  this.$('#organization').typeahead({
    hint: true,
    minLength: 3,
    highlight: true
  },
  {
    name: 'orgnizations',
    displayKey: 'value',
    valueKey: 'id',
    templates: {
      empty: Typeahead.compile('organizationNoRecords'),
      suggestion: Typeahead.compile('organizationSuggestion')
    },
    source: _.debounce(searchOrganizations, 250)
  });

  this.$('#organization').on('typeahead:selected', selectedOrganization);
  this.$('#organization').on('typeahead:autocompleted', autoCompletedOrganization);
};


var searchOrganizations = function (query, callback) {

  var fields = ['Id', 'Name', 'ShippingCity', 'ShippingState'];
  Meteor.call('searchOrganizations', query, {limit: 10}, fields, function (error, records) {
    if (error) {
      return throwError(error);
    }

    callback(records.map(function (record) {
      return {
        value: record.Name,
        id: record.Id,
        city: record.ShippingCity,
        state: record.ShippingState
      };
    }));
  });
};


var selectedOrganization = function (e, payload, dataset) {
  $('#' + e.target.name + 'Id').val(payload.id);
};


var autoCompletedOrganization = function (e, payload, dataset) {
  $('#' + e.target.name + 'Id').val(payload.id);
};
```
