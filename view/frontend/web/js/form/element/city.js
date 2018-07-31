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
            var string = JSON.stringify($eaCitiesJson),
                obj = JSON.parse(string),
                romania = obj.RO,
                romanianRegions = romania[value],
                city = $("[name='city']"),
                cityId = $("[name ='city_id']"),
                parentCity = $("[name ='shippingAddress.city']"),
                parentCityId = $("[name ='customCheckoutForm.city_id']"),
                initialInput = city.val(''),
                options,
                selectOptions;

            cityId.empty();

            var currentRegion = romania[value],
                currentRegionCities = currentRegion.cities;

            console.log('currentRegionCities', currentRegionCities);

            $.each(currentRegionCities, function (index, cityValue) {
                if ($.isPlainObject(cityValue)) {
                    $.each(cityValue, function (index, romCity) {
                        console.log('cityName', romCity);
                        options = '<option value=' + romCity + '>' + romCity + '</option>';
                        selectOptions = cityId.append(options);

                    })
                }
            });

            console.log('dfdfdfdfdf', cityId.length)
            console.log(this.setOptions(
                [{value: "278", title: "Alba", country_id: "RO", label: "Alba"}]
            ));

            options = '<option value=mizerie>mizerie</option>';
            selectOptions = cityId.append(options);


            console.log('selectOptions', selectOptions);
            var objectKey = Object.keys(romanianRegions.cities),
                objectLength = objectKey.length;

            if (objectLength !== 0) {
                parentCityId.show();
                parentCity.hide();
                console.log("test", initialInput)

            } else {
                parentCity.show();
                parentCityId.hide();
                city.replaceWith(initialInput);
            }
        }
    });
});

