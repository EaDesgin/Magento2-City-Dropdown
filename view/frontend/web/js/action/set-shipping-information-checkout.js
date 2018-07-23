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

        var directoryData = {
            "RO":
                {
                    "278": {
                        "code": "AB",
                        "name": "Alba",
                        "cities": {
                            "1": {
                                "name": "Aiud",
                                "id": "1"
                            },
                            "2": {
                                "name": "Abrud",
                                "id": "2"
                            }
                        }
                    },
                    "279": {
                        "code": "AR",
                        "name": "Arad",
                        "cities": {
                            "1": {
                                "name": "Arad",
                                "id": "3"
                            },
                            "2": {
                                "name": "Baia",
                                "id": "4"
                            }
                        }
                    }
                }
        };

        var string = JSON.stringify(directoryData),
            obj = JSON.parse(string),
            romania = obj.RO;


        var region_id = $(this).val(),
            region = romania[region_id];


        if (region_id) {
            var cityId = $("[name ='city_id']");
            var city = $("[name='city']"),
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

            selectOptions = cityObject.append(htmlSelect);


            if (typeof region !== 'undefined') {
                cityId.parent().show();
                city.parent().hide();
                cityId.replaceWith(selectOptions);
            }
            else {
                city.parent().show();
                cityId.parent().hide();
                city.replaceWith(initialInput);

            }
        }


        $(document).on('change', "[name='country_id']", function () {
        });

        $(document).on('change', "[name='region_id']", function () {

            var region_id = $(this).val(),
                region = romania[region_id];

            if (region_id) {
                var cityId = $("[name ='city_id']");
                var city = $("[name='city']");
                var parentCity = $("[name ='shippingAddress.city']");
                var parentCityId = $("[name ='customCheckoutForm.city_id']");
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


                if (typeof region !== 'undefined') {

                   parentCityId.show();
                   parentCity.hide();
                    cityId.replaceWith(selectOptions);
                }
                else {
                    parentCity.show();
                    parentCityId.hide();

                }
            }

        });

        return wrapper.wrap(setShippingInformationAction, function (originalAction, messageContainer) {


            return originalAction(messageContainer);
        });
    };
});