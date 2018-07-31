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
            var cityHtml = city.parent().html(),
                selectCity = cityHtml.replace("input", "select") + '</select>',
                cityObject = $(selectCity),
                selectedValue = $(cityHtml).val(),
                htmlSelect = '<option value></option>',
                cityName,
                options,
                optionsAll,
                selectOptions;

            cityObject.empty();

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
                region = romania[region_id],
                htmlSelect = '';

            if (region_id) {
                var city = $("[name='city']"),
                    cityHtml = city.parent().html(),
                    selectCity = cityHtml.replace("input", "select") + '</select>',
                    cityObject = $(selectCity),
                    selectClass = cityObject.addClass('select').removeClass('input-text'),
                    cityName,
                    options,
                    selectOptions;

                htmlSelect = '<option value></option>';

                $.each(region, function (index, value) {
                    if ($.isPlainObject(value)) {
                        $.each(value, function (index, romCity) {

                            cityName = romCity.name;
                            options = '<option value=' + cityName + '>' + cityName + '</option>';
                            htmlSelect += options;
                        })
                    }
                });

                cityObject.empty();
                selectOptions = cityObject.append(htmlSelect);

                // console.log('out length', Object.keys(region.cities).length)
                // console.log('region',region)
                console.log('htmlSelect', htmlSelect)

                if (region.cities === undefined){
                    return;
                }

                if (Object.keys(region.cities).length !== 0) {
                    city.replaceWith(selectOptions);
                } else {
                    city.replaceWith(initialInput);
                }
            }

        });

        return wrapper.wrap(setShippingInformationAction, function (originalAction, messageContainer) {
            return originalAction(messageContainer);
        });
    };
});