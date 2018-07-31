define([
    'jquery',
    'mage/utils/wrapper',
    'mage/template',
    'mage/validation',
    'underscore',
    'jquery/ui'
], function ($, wrapper) {
    'use strict';

    return function (setShippingInformationAction) {


        var string = JSON.stringify($eaCitiesJson),
            obj = JSON.parse(string),
            romania = obj.RO;


        var region_id = $("[name = 'region_id'] option:selected").val(),
            region = romania[region_id],
            city = $("[name='city']"),
            initialInput = city.val('');


        if (region_id) {
            var cityId = $("[name ='city_id']");
            var city = $("[name='city']");
            var parentCity = $("[name ='shippingAddress.city']");
            var parentCityId = $("[name ='customCheckoutForm.city_id']");
            var cityHtml = city.parent().html(),
                selectCity = cityHtml.replace("input", "select") + '</select>',
                cityObject = $(selectCity),
                selectedValue = $(cityHtml).val(),
                htmlSelect = '<option value></option>',
                cityName,
                options,
                optionsAll,
                selectOptions;

            cityId.empty();

            $.each(region, function (index, value) {
                if ($.isPlainObject(value)) {
                    $.each(value, function (index, romCity) {
                        cityName = romCity.name;
                        if (selectedValue === cityName) {
                            options = '<option selected value=' + cityName + '>' + cityName + '</option>';
                            htmlSelect += options;
                        }
                        else {
                            optionsAll = '<option value=' + cityName + '>' + cityName + '</option>';
                            htmlSelect += optionsAll;
                        }
                    })
                }
            });

            selectOptions = cityObject.append(htmlSelect);


        }


        $(document).on('change', "[name='country_id']", function () {
        });

        $(document).on('change', "[name='region_id']", function () {

            var region_id = $(this).val(),
                region = romania[region_id];

            if (region_id) {
                var cityId = $("[name ='city_id']");
                var city = $("[name='city']");
                var initialInput = city.val('');

                var parentCity = $("[name ='shippingAddress.city']");
                var parentCityId = $("[name ='customCheckoutForm.city_id']"),
                    cityName,
                    options,
                    selectOptions;
                cityId.empty();


                $.each(region, function (index, value) {
                    if ($.isPlainObject(value)) {
                        $.each(value, function (index, romCity) {

                            cityName = romCity.name;
                            options = '<option value=' + cityName + '>' + cityName + '</option>';
                            selectOptions = cityId.append(options);

                        })
                    }
                });

                if (Object.keys(region.cities).length !== 0) {
                    parentCity.show();
                    parentCityId.hide();
                    city.replaceWith(initialInput);
                } else {
                    parentCityId.show();
                    parentCity.hide();
                    cityId.replaceWith(selectOptions);


                }
            }

        });

        return wrapper.wrap(setShippingInformationAction, function (originalAction, messageContainer) {
            return originalAction(messageContainer);
        });
    };
});