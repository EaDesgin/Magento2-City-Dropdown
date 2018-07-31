/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */

var config = {
    map: {
        '*': {
            cityUpdater:'Eadesigndev_RomCity/js/city-updater'
        }
    },
    config: {
        mixins: {
            'Magento_Checkout/js/model/shipping-rates-validation-rules': {
                'Eadesigndev_RomCity/js/model/shipping-rates-validation-rules-mixin': true
            },
            'Magento_Checkout/js/action/set-shipping-information': {
                'Eadesigndev_RomCity/js/action/set-shipping-information-checkout': true
            },
            'Magento_Customer/js/addressValidation': {
                'Eadesigndev_RomCity/js/action/set-shipping-information-customer': true
            },
            'Magento_Checkout/js/action/create-shipping-address': {
                'Eadesigndev_RomCity/js/action/create-shipping-address-mixin': true
            },
        }
    }
};