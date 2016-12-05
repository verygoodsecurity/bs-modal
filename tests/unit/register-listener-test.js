import sinon from 'sinon';
import registerListener from 'bs-modal/register-listener';
import { module, test } from 'qunit';

module('Unit | Utility | register-listener');

test('it initializes a handler object and closes the modal', function(assert) {
  const route = {
    controller: {},
    addObserver: sinon.stub(),
    disconnectOutlet: sinon.stub(),
  };
  registerListener(route, 'controller.modal', 'controller.modalParams');

  assert.equal(route.addObserver.args.length, 1);
  assert.deepEqual(route.addObserver.args[0].slice(0, 2), [
    'controller.modal', 'controller.modalParams',
  ]);
  assert.equal(route.disconnectOutlet.args.length, 1);
  assert.deepEqual(route.disconnectOutlet.args[0], [{
    'outlet': 'modal', 'parentView': 'application',
  }]);
  assert.deepEqual(route.controller, {
    modal: null,
    modalParams: null
  });
});

test('it initializes a handler object and opens the modal', function(assert) {
  const modalController = { setupController: sinon.stub() };
  const route = {
    controller: {
      modal: 'cool-guy',
      modalParams: 'eyJuYW1lIjoiSm9lIEJhbmFuYSJ9',
    },
    addObserver: sinon.stub(),
    controllerFor: sinon.stub(),
    render: sinon.stub(),
  };

  route.controllerFor.returns(modalController);
  registerListener(route, 'controller.modal', 'controller.modalParams');

  assert.equal(route.addObserver.args.length, 1);
  assert.deepEqual(route.addObserver.args[0].slice(0, 2), [
    'controller.modal', 'controller.modalParams',
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
