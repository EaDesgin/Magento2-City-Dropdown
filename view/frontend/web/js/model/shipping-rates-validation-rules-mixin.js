define(['jquery'], function ($) {
    'use strict';

    return function (targetFunction) {
        targetFunction.getObservableFields = function () {
            var self = this,
                observableFields = [];

            $.each(self.getRules(), function (carrier, fields) {
                $.each(fields, function (field) {
                    if (observableFields.indexOf(field) === -1) {
                        observableFields.push(field);
                    }
                });
            });

            observableFields.push('country_id'); // Load shipping method on Country chnage
            observableFields.push('city'); // Load shipping method on Postcode chnage
            //observableFields.push('telephone'); // Load shipping method on Phone Number chnage
            //observableFields.push('city'); // Load shipping method on City chnage


            return observableFields;
        }

        return targetFunction;
    };
});