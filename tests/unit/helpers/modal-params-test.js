import { modalParams } from 'bs-modal/helpers/modal-params';
import { module, test } from 'qunit';

module('Unit | Helper | modal-params');

test('it creates an isQueryParams object', function(assert) {
  function t(params, hash, expectation) {
    let result = modalParams(params, hash);
    assert.deepEqual(result.getProperties('isQueryParams', 'values'), expectation);
  }

  t(['coolModalName'], undefined, {
    isQueryParams: true,
    values: {
      modal: 'coolModalName',
      modalParams: null,
    },
  });

  t(['coolModalName'], { name: 'Joe Banana' }, {
    isQueryParams: true,
    values: {
      modal: 'coolModalName',
      modalParams: 'eyJuYW1lIjoiSm9lIEJhbmFuYSJ9',
    },
  });
});
