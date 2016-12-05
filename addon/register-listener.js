import $ from 'jquery';
import { once } from 'ember-runloop';
import { isBlank, typeOf } from 'ember-utils';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

class ModalHandler {
  constructor(route, modalNameBinding, modalParamsBinding) {
    this.route = route;
    this.modalNameBinding = modalNameBinding;
    this.modalParamsBinding = modalParamsBinding;
  }

  isModalOpen() {
    return !isBlank(this.getModalName());
  }

  getModalName() {
    return get(this.route, this.modalNameBinding);
  }

  getModalParams() {
    const params = get(this.route, this.modalParamsBinding);
    return isBlank(params) ? undefined : JSON.parse(atob(params));
  }

  open() {
    $(document.body).addClass('modal-open');
    const modalName = this.getModalName();
    const controller = this.route.controllerFor(modalName);

    if (typeOf(controller.setupController) === 'function') {
      controller.setupController(this.getModalParams());
    }

    this.route.render(modalName, {
      into: 'application',
      outlet: 'modal'
    });
  }

  close() {
    $(document.body).removeClass('modal-open');
    set(this.route, this.modalParamsBinding, null);
    set(this.route, this.modalNameBinding, null);
    this.route.disconnectOutlet({
      outlet: 'modal',
      parentView: 'application'
    });
  }

  refresh() {
    if (this.isModalOpen()) {
      this.open();
    } else {
      this.close();
    }
  }
}

export default function registerModalListener(route, modalNameBinding, modalParamsBinding) {
  const handler = new ModalHandler(route, modalNameBinding, modalParamsBinding);
  function refresh() {
    handler.refresh();
  }
  route.addObserver(modalNameBinding, modalParamsBinding, () => once(route, refresh));
  refresh();
}
