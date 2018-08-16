define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote'
], function ($, wrapper,quote) {
    'use strict';

    return function (setShippingInformationAction) {



        var region = '';

        return wrapper.wrap(setShippingInformationAction, function (originalAction, messageContainer) {
            var address = quote.shippingAddress();

            return originalAction(messageContainer);
        });
    };
});