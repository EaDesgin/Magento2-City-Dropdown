
define(['jquery',],
    function ($) {
    'use strict';

    return function (Component) {
        return Component.extend({
            validateShippingInformation: function () {

                var formErrors = '#shipping-new-address-form div.field-error',
                    notValid = [];

                $(formErrors).each(function () {
                    notValid.push(true)
                });

                this.source.set('params.invalid', false);

                if(notValid.length > 0){
                    this.source.set('params.invalid', true)
                    return false;
                }

                console.log('test', notValid);
                var result = this._super();

                return result;
            }
        });
    }
});
