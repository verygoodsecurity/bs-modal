import sinon from 'sinon';
import registerListener from 'bs-modal/register-listener';
import { module, test } from 'qunit';
import run from 'ember-runloop';

module('Unit | Utility | register-listener');

test('it initializes a handler object and closes the modal', function(assert) {
  const route = {
    disconnectOutlet: sinon.stub(),
  };
  const controller = {
    addObserver: sinon.stub(),
  };

  run(() => {
    registerListener(route, controller, 'modal', 'modalParams');
  });

  assert.equal(controller.addObserver.args.length, 1);
  assert.deepEqual(controller.addObserver.args[0].slice(0, 2), [
    'modal', 'modalParams',
  ]);
  assert.equal(route.disconnectOutlet.args.length, 1);
  assert.deepEqual(route.disconnectOutlet.args[0], [{
    'outlet': 'modal', 'parentView': 'application',
  }]);
});

test('it initializes a handler object and opens the modal', function(assert) {
  const modalController = { setupController: sinon.stub() };
  const route = {
    controllerFor: sinon.stub(),
    render: sinon.stub(),
  };

  const controller = {
    modal: 'cool-guy',
    modalParams: 'eyJuYW1lIjoiSm9lIEJhbmFuYSJ9',
    addObserver: sinon.stub(),
  };

  route.controllerFor.returns(modalController);
  run(() => {
    registerListener(route, controller, 'modal', 'modalParams');
  });

  assert.equal(controller.addObserver.args.length, 1);
  assert.deepEqual(controller.addObserver.args[0].slice(0, 2), [
    'modal', 'modalParams',
  ]);
  assert.deepEqual(route.controllerFor.args, [['cool-guy']]);
  assert.deepEqual(route.render.args, [[
    'cool-guy', { into: 'application', outlet: 'modal' },
  ]]);
  assert.equal(modalController.setupController.args.length, 1);
  assert.deepEqual(modalController.setupController.args[0], [{
    'name': 'Joe Banana',
  }]);
});
