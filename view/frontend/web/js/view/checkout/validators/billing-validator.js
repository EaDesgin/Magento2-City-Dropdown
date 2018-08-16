define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/additional-validators'
    ],
    function (Component, additionalValidators, billingValidator) {
        'use strict';
        additionalValidators.registerValidator(billingValidator);
        return Component.extend({});
    }
);
