define([
    'jquery',
    'mage/utils/wrapper',
    'mage/template',
    'mage/validation',
    'underscore',
    'jquery/ui'
], function ($) {
    'use strict';

    return function () {

        var string = JSON.stringify($eaCitiesJson),
            obj = JSON.parse(string),
            romania = obj.RO;

        var region_id = $("[name *= 'region_id'] option:selected").val();
        var region = romania[region_id],
            city = $("[name*='city']"),
            initialInput = city.val('');


var id = city.val(id);
console.log("id", id);

        console.log("initialInput",initialInput);
        if (region_id) {


            var cityHtml = city.parent().html(),
                selectCity = cityHtml.replace("input", "select") + '</select>',
                cityObject = $(selectCity),
                selectedValue = $(cityHtml).val(),
                htmlSelect = '<option></option>',
                selectOptions,
                options,
                optionsAll,
                cityName;


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
            if (typeof region !== 'undefined') {
                city.replaceWith(selectOptions);
            }
        }

        $(document).on('change', "[name='country_id']", function () {
        });

        $(document).on('change', "[name *= 'region_id']", function () {

            var region_id = $(this).val(),
                region = romania[region_id],
                regionName = this.name,
                cityInputName = regionName.replace("region_id", "city");


            if (region_id) {
                var city = $("[name*='city']"),
                    cityHtml = city.parent().html(),
                    selectCity = cityHtml.replace("input", "select") + '</select>',
                    cityObject = $(selectCity),
                    selectClass = cityObject.addClass('admin__control-select').removeClass('admin__control-text'),
                    htmlSelect = '<option value></option>',
                    cityName,
                    options,
                    selectOptions;

                cityObject.empty();

                $.each(region, function (index, value) {
                    if ($.isPlainObject(value)) {
                        $.each(value, function (index, romCity) {

                            cityName = romCity.name;
                            options = '<option value=' + cityName + '>' + cityName + '</option>';
                            htmlSelect += options;
                        })
                    }
                });
                console.log("test",initialInput)

                selectOptions = cityObject.append(htmlSelect);

                if (region_id.cities == 0) {
                    cityObject.addClass('admin__control-text').removeClass('admin__control-select');
                    city.replaceWith(initialInput);
                    console.log("finalinput",initialInput)
                }
                else {
                    cityObject.addClass('admin__control-select').removeClass('admin__control-text');
                    city.replaceWith(selectOptions);
                }
            }
        });
    };
});