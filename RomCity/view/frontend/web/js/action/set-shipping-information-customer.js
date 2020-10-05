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
            romanianRegions = obj.RO,
            initialcity = $("[name='city']"),
            initialInput = initialcity.val('');

        $(document).on('change', "[name='region_id']", function () {

            var regionId = $(this).val(),
                regions = romanianRegions[regionId],
                htmlSelect = '';

            if (regionId) {

                var city = $("[name='city']"),
                    cityHtml = city.parent().html(),
                    selectCity = cityHtml.replace("input", "select") + '</select>',
                    cityObject = $(selectCity),
                    cityName,
                    cityOptions,
                    selectOptions;

                htmlSelect = '<option value></option>';

                $.each(regions, function (index, value) {
                    if ($.isPlainObject(value)) {
                        $.each(value, function (index, cityOptionValue) {
                            cityName = cityOptionValue.name;
                            cityOptions = '<option value=' + cityName + '>' + cityName + '</option>';
                            htmlSelect += cityOptions;

                        });
                    }
                });

                cityObject.empty();
                selectOptions = cityObject.append(htmlSelect);

                if (regions.cities === undefined) {
                    return;
                }

                if (Object.keys(regions.cities).length !== 0) {
                    city.replaceWith(selectOptions);
                } else {
                    city.replaceWith(initialInput,"initial input");
                }
            }
            $(document).on('change', "[name='city']", function () {

                var citySelectedValue= $("[name = 'city'] option:selected").val();
                var cityInputValue = $("[name= 'city']").val();
                cityInputValue= citySelectedValue;

            });

        });

        return wrapper.wrap(setShippingInformationAction, function (originalAction, messageContainer) {
            return originalAction(messageContainer);
        });
    };
});





