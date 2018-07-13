define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/quote',
    'mage/template',
    'mage/validation',
    'underscore',
    'jquery/ui'
], function ($, mageTemplate, _) {
    'use strict';

    $.widget('mage.cityUpdater', {
        options: {
            cityTemplate:
            '<select>' + '<option>' + '1' + '</option>' + '<option>' + '2' + '</option>' + '</select>'
        }
    });
    return function () {


        var directoryData = {
            "RO": [
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
            ]
        };
        var string = JSON.stringify(directoryData);

        console.log(string);

        var obj = JSON.parse(string);

        $(document).on('change', "[name='country_id']", function () {
        });

        $(document).on('change', "[name='region_id']", function () {

            var region_option = $("[name='region_id'] option:selected");

            var region_id = region_option.val();

            console.log(region_id);

            var romania = obj.RO;

            console.log(romania);


            $("[name='city']").replaceWith('<select>' + '<option>fsdjfj</option><option>fefs</option>' + '</select>');

        });
    };
});