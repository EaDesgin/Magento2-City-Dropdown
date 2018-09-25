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
    'Magento_Ui/js/form/element/abstract',
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
                romanianRegions,
                parentCity,
                currentRegionCities;

            romanianRegions = romania[value];

            if(romanianRegions === undefined){

                this.hide();

                return romanianRegions;
            }

            parentCity = $("[name ='shippingAddress.city']");

            currentRegionCities = romanianRegions.cities;

            var cityOptions = [];
            $.each(currentRegionCities, function (index, cityOptionValue) {

                var name = cityOptionValue.name;

                var jsonObject = {
                    value: index,
                    title: name,
                    country_id: "",
                    label: name
                };

                cityOptions.push(jsonObject);
            });

            this.setOptions(cityOptions);

            var getCity = this.parentName + '.' + 'city',
                city = registry.get(getCity),
                cases = cityOptions.length;

            if (cases === 0) {
                city.show();
                this.hide();
                parentCity.show();
            } else {
                city.hide();

                this.show();
                parentCity.hide();
            }
        }
    });
});

