/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'underscore',
    'uiRegistry',
    'Magento_Ui/js/form/element/select',
    'Magento_Checkout/js/model/default-post-code-resolver',
    'jquery',
    'mage/utils/wrapper',
    'mage/template',
    'mage/validation',
    'underscore',
    'jquery/ui'
], function (_, registry, Select, defaultPostCodeResolver, $) {
    'use strict';

    return Select.extend({
        defaults: {
            skipValidation: false,
            imports: {
                update: '${ $.parentName }.region_id:value'
            }
        },

        /**
         * @param {String} value
         */
        update: function (value) {
            var region = registry.get(this.parentName + '.' + 'region_id'),
                options = region.indexedOptions,
                option,
                string = JSON.stringify($eaCitiesJson),
                obj = JSON.parse(string),
                romania = obj.RO,
                city = $("[name='city']"),
                cityName,
                options,
                selectOptions,
                regioncvb = romania[value],
                initialInput = city.val(''),
                option = options[value];

console.log('string', string);

            if (value) {
                var cityId = $("[name ='city_id']");
                var city = $("[name='city']");
                var parentCity = $("[name ='shippingAddress.city']");
                var parentCityId = $("[name ='customCheckoutForm.city_id']"),
                    cityName,
                    options,
                    selectOptions;
                cityId.empty();


                $.each(regioncvb, function (index, value) {
                    if ($.isPlainObject(value)) {
                        $.each(value, function (index, romCity) {

                            cityName = romCity.name;
                            options = '<option value=' + cityName + '>' + cityName + '</option>';
                            selectOptions = cityId.append(options);

                        })
                    }
                });
                var objectKey = Object.keys(regioncvb.cities);
                var objectLenght = objectKey.length;

                console.log('objectKey', objectKey);

                console.log("object length", objectLenght);

                if (objectLenght !== 0) {
                    parentCityId.show();
                    parentCity.hide();
                    console.log("test", initialInput)

                } else {
                    parentCity.show();
                    parentCityId.hide();
                    city.replaceWith(initialInput);

                }
            }

        }
    });
});

