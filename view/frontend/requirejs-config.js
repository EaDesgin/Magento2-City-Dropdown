/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */

var config = {

    config: {
        mixins: {
            'Magento_Checkout/js/model/shipping-rates-validation-rules': {
                'Eadesigndev_RomCity/js/model/shipping-rates-validation-rules': true
            },
            'Magento_Customer/js/addressValidation': {
                'Eadesigndev_RomCity/js/action/set-shipping-information-customer': true
            },
            'Magento_Checkout/js/action/create-shipping-address': {
                'Eadesigndev_RomCity/js/action/create-shipping-address-mixin': true
            },
            'Magento_Checkout/js/action/set-shipping-information': {
                'Eadesigndev_RomCity/js/action/set-shipping-information-mixin': true
            },
            'Magento_Checkout/js/action/create-billing-address': {
                'Eadesigndev_RomCity/js/action/set-billing-information-mixin': true
            },
            "Magento_Checkout/js/view/shipping" : {
                "Eadesigndev_RomCity/js/view/shipping": true
            },
            "Magento_Checkout/js/view/billing-address" : {
                "Eadesigndev_RomCity/js/view/billing-address": true
            },
            'Magento_Checkout/js/model/shipping-rate-processor/new-address': {
                'Eadesigndev_RomCity/js/model/shipping-rate-processor/new-address': true
            }
        }
    }
};