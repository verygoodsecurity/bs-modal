import sinon from 'sinon';
import registerListener from 'bs-modal/register-listener';
import run from 'ember-runloop';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('bs-modal/register-listener', function() {
  it('initializes a handler object and closes the modal', function() {
    const route = {
      disconnectOutlet: sinon.stub(),
    };
    const controller = {
      addObserver: sinon.stub(),
    };

    run(() => registerListener(route, controller, 'modal', 'modalParams'));
    expect(controller.addObserver.args).to.have.length(1);
    expect(controller.addObserver.args[0].slice(0, 2)).to.deep.equal([
      'modal', 'modalParams',
    ]);
    expect(route.disconnectOutlet.args).to.have.length(1);
    expect(route.disconnectOutlet.args[0]).to.deep.equal([{
      'outlet': 'modal', 'parentView': 'application',
    }]);
  });

  it('initializes a handler object and opens the modal', function() {
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
    run(() => registerListener(route, controller, 'modal', 'modalParams'));

    expect(controller.addObserver.args).to.have.length(1);
    expect(controller.addObserver.args[0].slice(0, 2)).to.deep.equal([
      'modal', 'modalParams',
    ]);
    expect(route.controllerFor.args).to.deep.equal([['cool-guy']]);
    expect(route.render.args).to.deep.equal([[
      'cool-guy', { into: 'application', outlet: 'modal' },
    ]]);
    expect(modalController.setupController.args).to.have.length(1);
    expect(modalController.setupController.args[0]).to.deep.equal([{
      'name': 'Joe Banana',
    }]);
  });
});
