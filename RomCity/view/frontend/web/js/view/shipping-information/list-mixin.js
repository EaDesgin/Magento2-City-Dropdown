/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'ko',
    'mageUtils',
    'uiComponent',
    'uiLayout',
    'Magento_Checkout/js/model/quote'
], function ($, ko, utils, Component, layout, quote) {
    'use strict';

    var mixin = {
        initialize: function () {
            var self = this;

            this._super()
                .initChildren();

            quote.shippingAddress.subscribe(function (address) {
                var shippingCityId = $("#shipping-new-address-form [name = 'city_id'] option:selected"),
                    shippingCityIdValue = shippingCityId.text();
                    if (shippingCityIdValue){
                address.city = shippingCityIdValue;
            }
                self.createRendererComponent(address);
            });

            return this;
        }
    }
    return function (target) {
        return target.extend(mixin);
    }

});