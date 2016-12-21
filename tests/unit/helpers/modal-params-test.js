import { modalParams } from 'bs-modal/helpers/modal-params';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('bs-modal/helpers/modal-params', function() {
  it('creates an isQueryParams object', function() {
    function t(params, hash, expectation) {
      const result = modalParams(params, hash);
      expect(result.getProperties('isQueryParams', 'values')).to.deep.equal(expectation);
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
});
