
define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote',
], function ($, wrapper,quote) {
    'use strict';

    return function (setBillingAddressAction) {
        return wrapper.wrap(setBillingAddressAction, function (originalAction, messageContainer) {
            var billingAddress = quote.billingAddress();

            console.log(quote.billingAddress,"billing ddresss")

         

            return originalAction(messageContainer);
        });
    };
});