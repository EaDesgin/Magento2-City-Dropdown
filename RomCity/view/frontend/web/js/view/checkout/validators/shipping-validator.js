define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/shipping-rates-validator',
        'Magento_Checkout/js/model/shipping-rates-validation-rules',
        '../../../model/shipping/customer-order-validator',
        '../../../model/shipping/customer-order-rules'
    ],
    function (
        Component,
        defaultShippingRatesValidator,
        defaultShippingRatesValidationRules,
        shippingRatesValidator,
        shippingRatesValidationRules
    ) {
        'use strict';
        defaultShippingRatesValidator.registerValidator('flatrate', shippingRatesValidator);
        defaultShippingRatesValidationRules.registerRules('flatrate', shippingRatesValidationRules);
        return Component;
    }
);