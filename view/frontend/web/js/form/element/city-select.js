/**
 * @api
 */
define([
    'Magento_Ui/js/form/element/select',
    'uiRegistry',
], function (Element, registry) {
    'use strict';

    return Element.extend({
        defaults: {
            imports: {
                update: '${ $.parentName }.region_id:value',
                city: '${ $.parentName }.city'
            },
            options: [],
            visible: false
        },

        initialize: function () {
            this._super();

            if (this.name.includes('steps.billing-step')) {
                this.visible(false)
            }
        },

        /**
         * On region update we check for city
         *
         * @param {string} regionId
         */
        update: function (regionId) {
            let options = [],
                cityValue,
                cities,
                regions = JSON.parse(window.checkoutConfig.cities);

            if (regions && regions[regionId] && regions[regionId].length) {
                cities = regions[regionId];

                options = cities.map(function (city) {
                    return {title: city, value: city, labeltitle: city, label: city}
                })
            }

            if (!options || !options.length) {
                this.visible(false);
                this.value(null);
            }

            if (options && options.length) {
                options = [{title: "", value: "", label: "Selectati localitatea"}].concat(options);
                this.visible(true);

                cityValue = registry.get(this.imports.city).value();

                if (!this.value() && cityValue) {
                    this.value(cityValue)
                }
            }

            this.options(options);
        },
    });
});
