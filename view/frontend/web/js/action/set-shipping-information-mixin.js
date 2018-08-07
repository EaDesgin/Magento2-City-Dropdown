define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote',
], function ($, wrapper, quote, shippingFields) {
    'use strict';

    return function (setShippingInformationAction) {
        return wrapper.wrap(setShippingInformationAction, function (originalAction, messageContainer) {

            var shippingAddress = quote.shippingAddress(),
                shippingCityId = $("[name = 'city_id'] option:selected"),
                shippingCityIdValue = shippingCityId.text();

            shippingAddress.city = shippingCityIdValue;

            return originalAction(messageContainer);
        });
    };
});