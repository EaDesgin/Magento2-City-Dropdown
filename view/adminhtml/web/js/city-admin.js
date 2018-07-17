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

        var directoryData = {
            "RO":
                {
                    "name": "Romania",
                    "regions": {
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
                }

        };
        var string = JSON.stringify(directoryData),
            obj = JSON.parse(string),
            romania = obj.RO;

        $(document).on('change', "[name='country_id']", function () {
        });

        $(document).on('change', "[name*='region_id']", function () {

            var region_id = $(this).val(),
                region = romania.regions[region_id],
                regionName = this.name,
                cityName = regionName.replace("region_id", "city");

            if (region_id) {
                var city = $("[name='"+ cityName +"']"),
                    cityHtml = city.parent().html(),
                    selectCity = cityHtml.replace("input", "select") + '</select>',
                    cityObject = $(selectCity),
                    cityName1 = region.cities[1].name,
                    cityName2 = region.cities[2].name;

                cityObject.empty();

                var selectOptions = cityObject.append
                (
                    '<option>' + '' + '</option>' +
                    '<option value=' + cityName1 + '>' + cityName1 + '</option>' +
                    '<option value=' + cityName2 + '>' + cityName2 + '</option>'
                );

                city.replaceWith(selectOptions);
            }
        });
    };
});