define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote',
], function ($, wrapper, quote) {
    'use strict';

    return function (setBillingAddressAction) {
        return wrapper.wrap(setBillingAddressAction, function (originalAction, messageContainer) {
            var billingAddress = quote.billingAddress(),
                shippingAddress = quote.shippingAddress(),
                shippingCityId = $("#shipping-new-address-form [name = 'city_id'] option:selected"),
                shippingCityIdValue = shippingCityId.text();

            shippingAddress.city = shippingCityIdValue;

            return originalAction(messageContainer);
        });
    };
});