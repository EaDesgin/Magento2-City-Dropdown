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
        },
    });
    return function () {


        var directoryData = '{\n' +
            '  "RO": {\n' +
            '    "name": "Romania",\n' +
            '    "regions": {\n' +
            '      "278": {\n' +
            '        "code": "AB",\n' +
            '        "name": "Alba",\n' +
            '        "cities": {\n' +
            '          "1": {\n' +
            '            "name":"Aiud",\n' +
            '            "id" : "1"\n' +
            '          },\n' +
            '          "2": {\n' +
            '            "name":"Abrud",\n' +
            '            "id" : "2"\n' +
            '          }\n' +
            '        }\n' +
            '      },\n' +
            '      "279": {\n' +
            '        "code": "AR",\n' +
            '        "name": "Arad",\n' +
            '        "cities": {\n' +
            '          "1": {\n' +
            '            "name":"Arad",\n' +
            '            "id" : "3"\n' +
            '          },\n' +
            '          "2": {\n' +
            '            "name":"Baia",\n' +
            '            "id" : "4"\n' +
            '          }\n' +
            '        }\n' +
            '      }\n' +
            '    }\n' +
            '  }\n' +
            '}',
            obj = JSON.parse(directoryData);


        $(document).on('change', "[name='country_id']", function () {
        });

        $(document).on('change', "[name='region_id']", function () {
            console.log('test');

            var region_id = $(this).val(),
                region = obj.RO.regions[region_id];
            console.log(region);

            if (region_id) {
                $("[name='city']").replaceWith('<select>' + '<option>' + region.cities[1].name + '</option>' + '</select>');
            }
        });
    };
});