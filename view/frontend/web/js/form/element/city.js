
/**
 * @api
 */
define([
    'Magento_Ui/js/form/element/abstract',
    'Magento_Ui/js/lib/validation/validator'
], function (Element, validator) {
    'use strict';

    return Element.extend({
        defaults: {
            imports: {
                updateCitySelect: '${ $.parentName }.city_id:value'
            },
            options: []
        },

        /**
         * Validates itself by it's validation rules using validator object.
         * If validation of a rule did not pass, writes it's message to
         * 'error' observable property.
         *
         * @returns {Object} Validate information.
         */
        validate: function () {
            var value = this.value(),
                result = validator(this.validation, value, this.validationParams),
                message =  result.message,
                isValid = this.disabled() || result.passed;

            this.error(message);
            this.error.valueHasMutated();
            this.bubble('error', message);

            if (this.source && !isValid) {
                this.source.set('params.invalid', true);
            }

            return {
                valid: isValid,
                target: this
            };
        },

        /**
         *
         * @param {string} cityName
         */
        updateCitySelect: function (cityName) {

            if (cityName || cityName === '') {
                this.visible(false);
                this.value(cityName)
                return;
            }

            this.visible(true);
        },
    });
});
