/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */

var config = {
    map: {
        '*': {
            rom_city:'Eadesigndev_RomCity/js/city-updater'
        }
    },
    config: {
        mixins: {
            'Magento_Checkout/js/model/shipping-rates-validation-rules': {
                'Eadesigndev_RomCity/js/model/shipping-rates-validation-rules-mixin': true
            }
        }
    }
};