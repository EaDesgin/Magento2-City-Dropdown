define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote'
], function ($, wrapper, quote) {
    'use strict';

    return function (setShippingInformationAction) {


        return wrapper.wrap(setShippingInformationAction, function (originalAction, messageContainer) {
            var address = quote.shippingAddress();

            if (address !== null) {
                var region = $("#shipping-new-address-form [name = 'region_id'] option:selected").text(),
                    city = $("#shipping-new-address-form [name = 'city_id'] option:selected").text();

                address.region = region;
                address.city = city;
            }

            return originalAction(messageContainer);
        });
    };
});