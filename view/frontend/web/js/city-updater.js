/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'mage/template',
    'underscore',
    'jquery/ui',
    'mage/validation'
], function ($, mageTemplate, _) {
    'use strict';
    $.widget('mage.cityIdUpdater', {
        options: {
            cityIdTemplate:
                '<option value="<%- data.value %>" <% if (data.isSelected) { %>selected="selected"<% } %>>' +
                '<%- data.title %>' +
                '</option>',
            isCityIdRequired: true,
            isZipRequired: true,
            isRegionRequired: true,
            currentCityId: null,
            isMultipleCountriesAllowed: true
        },

        /**
         *
         * @private
         */
        _create: function () {
            this._initRegionElement();

            this.currentCityIdOption = this.options.currentcityId;
            this.cityIdTmpl = mageTemplate(this.options.cityIdTemplate);

            this._updateCityId(this.element.find('option:selected').val());

            $(this.options.cityIdListId).on('change', $.proxy(function (e) {
                this.setOption = false;
                this.currentCityIdOption = $(e.target).val();
            }, this));

            $(this.options.cityIdInputId).on('focusout', $.proxy(function () {
                this.setOption = true;
            }, this));
        },

        /**
         *
         * @private
         */
        _initRegionElement: function () {

            if (this.options.isMultipleCountriesAllowed) {
                this.element.parents('div.field').show();
                this.element.on('change', $.proxy(function (e) {
                    this._updateCityId($(e.target).val());
                }, this));

                if (this.options.isRegionRequired) {
                    this.element.addClass('required-entry');
                    this.element.parents('div.field').addClass('required');
                }
            } else {
                this.element.parents('div.field').hide();
            }
        },

        /**
         * Remove options from dropdown list
         *
         * @param {Object} selectElement - jQuery object for dropdown list
         * @private
         */
        _removeSelectOptions: function (selectElement) {
            selectElement.find('option').each(function (index) {
                if (index) {
                    $(this).remove();
                }
            });
        },

        /**
         * Render dropdown list
         * @param {Object} selectElement - jQuery object for dropdown list
         * @param {String} key - region code
         * @param {Object} value - region object
         * @private
         */
        _renderSelectOption: function (selectElement, key, value) {
            selectElement.append($.proxy(function () {
                var name = value.name.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, '\\$&'),
                    tmplData,
                    tmpl;

                if (value.code && $(name).is('span')) {
                    key = value.code;
                    value.name = $(name).text();
                }

                tmplData = {
                    value: key,
                    title: value.name,
                    isSelected: false
                };

                if (this.options.defaultCityId === key) {
                    tmplData.isSelected = true;
                }

                tmpl = this.cityIdTmpl({
                    data: tmplData
                });

                return $(tmpl);
            }, this));
        },

        /**
         * Takes clearError callback function as first option
         * If no form is passed as option, look up the closest form and call clearError method.
         * @private
         */
        _clearError: function () {
            var args = ['clearError', this.options.cityIdListId, this.options.cityIdInputId, this.options.postcodeId];

            if (this.options.clearError && typeof this.options.clearError === 'function') {
                this.options.clearError.call(this);
            } else {
                if (!this.options.form) {
                    this.options.form = this.element.closest('form').length ? $(this.element.closest('form')[0]) : null;
                }

                this.options.form = $(this.options.form);

                this.options.form && this.options.form.data('validator') &&
                this.options.form.validation.apply(this.options.form, _.compact(args));

                // Clean up errors on region & zip fix
                $(this.options.cityIdInputId).removeClass('mage-error').parent().find('[generated]').remove();
                $(this.options.cityIdListId).removeClass('mage-error').parent().find('[generated]').remove();
                $(this.options.postcodeId).removeClass('mage-error').parent().find('[generated]').remove();
            }
        },

        /**
         * Update dropdown list based on the country selected
         *
         * @param {String} country - 2 uppercase letter for country code
         * @private
         */
        _updateCityId: function (region) {
            // Clear validation error messages
            var cityIdList = $(this.options.cityIdListId),
                cityIdInput = $(this.options.cityIdInputId),
                postcode = $(this.options.postcodeId),
                label = cityIdList.parent().siblings('label'),
                requiredLabel = cityIdList.parents('div.field'), eaCitiesJson;

            this._clearError();
            this._checkCityIdRequired(region);

            console.log('test put')

            // Populate state/province dropdown list if available or use input box
            if (eaCitiesJson !== undefined) {
                this._removeSelectOptions(cityIdList);
                $.each(this.options.eaCitiesJson[region], $.proxy(function (key, value) {
                    this._renderSelectOption(cityIdList, key, value);
                }, this));


                if (this.options.isCityIdRequired) {
                    cityIdList.addClass('required-entry').removeAttr('disabled');
                    requiredLabel.addClass('required');
                } else {
                    cityIdList.removeClass('required-entry validate-select').removeAttr('data-validate');
                    requiredLabel.removeClass('required');

                    if (!this.options.optionalCityIdAllowed) { //eslint-disable-line max-depth
                    }
                }

                cityIdList.show();
                cityIdInput.hide();
                label.attr('for', cityIdList.attr('id'));
            } else {
                this._removeSelectOptions(cityIdList);

                if (this.options.isCityIdRequired) {
                    cityIdInput.addClass('required-entry').removeAttr('disabled');
                    requiredLabel.addClass('required');
                } else {

                    requiredLabel.removeClass('required');
                    cityIdInput.removeClass('required-entry');
                }

                cityIdList.removeClass('required-entry').prop('disabled', 'disabled').hide();
                cityIdInput.show();
                label.attr('for', cityIdInput.attr('id'));
            }

            // If country is in optionalzip list, make postcode input not required
            if (this.options.isZipRequired) {
                $.inArray(region, this.options.countriesWithOptionalZip) >= 0 ?
                    postcode.removeClass('required-entry').closest('.field').removeClass('required') :
                    postcode.addClass('required-entry').closest('.field').addClass('required');
            }

            // Add defaultvalue attribute to state/province select element
            cityIdList.attr('defaultvalue', this.options.defaultCityId);
        },

        /**
         * Check if the selected country has a mandatory region selection
         *
         * @param {String} country - Code of the country - 2 uppercase letter for country code
         * @private
         */
        _checkCityIdRequired: function (cityId) {
            var self = this, eaCitiesJson;

            this.options.isCityIdRequired = false;
            eaCitiesJson = this.options.eaCitiesJson;

            if (eaCitiesJson !== undefined) {
                $.each(this.options.eaCitiesJson.config['cityId_required'], function (index, elem) {
                    if (elem === region) {
                        self.options.isCityIdRequired = true;
                    }
                });
            }
        }
    });

    return $.mage.cityIdUpdater;
});
