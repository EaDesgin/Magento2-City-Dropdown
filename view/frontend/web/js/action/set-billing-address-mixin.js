define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote',
], function ($, wrapper, quote) {
    'use strict';

    return function (setBillingAddressAction) {
        return wrapper.wrap(setBillingAddressAction, function (originalAction, messageContainer) {

            var billingAddress,
                billingCityId = $("[name = 'customCheckoutForm.city_id'] option:selected"),
                billingCityIdValue = billingCityId.text();

            console.log('quote billing address', quote.billingAddress());

            if(quote.billingAddress() !== null){

                billingAddress = quote.billingAddress();

            }

            console.log( 'quote', quote);

            console.log('billing address', billingAddress)

            // billingAddress.city = billingCityIdValue;


            return originalAction(messageContainer);
        });
    };
});