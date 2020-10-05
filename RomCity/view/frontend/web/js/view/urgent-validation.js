define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/shipping-rates-validator',
        'Magento_Checkout/js/model/shipping-rates-validation-rules',
        '../model/shipping-rates-validator',
        '../model/shipping-rates-validation-rules'
    ],
    function (
        Component,
        defaultShippingRatesValidator,
        defaultShippingRatesValidationRules,
        eadesigndevurgentShippingRatesValidator,
        eadesigndevurgentShippingRatesValidationRules
    ) {
        'use strict';
        defaultShippingRatesValidator.registerValidator('eadesigndevurgent', eadesigndevurgentShippingRatesValidator);
        defaultShippingRatesValidationRules.registerRules('eadesigndevurgent', eadesigndevurgentShippingRatesValidationRules);
        return Component;

    }
);