# bs-modal

[![CircleCI](https://circleci.com/gh/cohitre/bs-modal.svg?style=svg)](https://circleci.com/gh/cohitre/bs-modal)

This is an ember addon to drive modal windows by the query string parameters.
Whenever the query string parameters are updated with a path to a controller the
controller is rendered in the `modal` outlet and the additional modalParams are
passed to the controller via a call to the `setupController` method.

## Installation

* `git clone <repository-url>` this repository
* `cd bs-modal`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
