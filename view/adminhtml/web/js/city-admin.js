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

        $(document).on('change', "[name*='region_id']", function () {
            var region_id = $(this).val(),
                region = romania[region_id],
                regionName = this.name,
                cityInputName = regionName.replace("region_id", "city");

            if (region_id) {
                var city = $("[name*='" + cityInputName + "']"),
                    cityHtml = city.parent().html(),
                    selectCity = cityHtml.replace("input", "select") + '</select>',
                    cityObject = $(selectCity),
                    htmlSelect = '<option></option>',
                    cityName,
                    options,
                    selectOptions,
                    initialInput = $('<input />', {
                        'class': 'admin__control-text',
                        'type': 'text',
                        'data-bind': 'value:value,' +
                        'hasFocus:focused,' +
                        'valueUpdate: valueUpdate,' +
                        'attr: {' +
                        'name: inputName,' +
                        'placeholder: placeholder,' +
                        'id: uid,' +
                        'disabled: disabled,' +
                        'maxlength: 255,' +
                        'event: {change: userChanges}',
                        'name': cityInputName,
                        'maxlength': '255'
                    });

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

                selectOptions = cityObject.append(htmlSelect);

                if (region.cities === undefined) {
                    return;
                }
                if (Object.keys(region.cities).length !== 0) {
                    city.replaceWith(selectOptions);
                } else {
                    city.replaceWith(initialInput);
                }
            }
        });
    };
});