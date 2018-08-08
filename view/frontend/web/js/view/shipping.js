define(['jquery',
        'Magento_Checkout/js/action/create-shipping-address',
        'Magento_Checkout/js/action/select-shipping-address',
        'Magento_Checkout/js/checkout-data',
        'Magento_Checkout/js/model/quote',


    ],
    function ($, createShippingAddress, selectShippingAddress, checkoutData, quote) {
        'use strict';

        return function (Component) {
            return Component.extend({
                validateShippingInformation: function () {

                    var formErrors = '#shipping-new-address-form div.field-error',
                        notValid = [];

                    $(formErrors).each(function () {
                        notValid.push(true)
                    });

                    this.source.set('params.invalid', false);

                    if (notValid.length > 0) {
                        this.source.set('params.invalid', true)
                        return false;
                    }

                    var result = this._super();

                    return result;
                },
                saveNewAddress: function () {
                    var addressData,
                        newShippingAddress;


                    this.source.set('params.invalid', false);
                    this.triggerShippingDataValidateEvent();

                    var address = quote.shippingAddress(),
                        shippingCityId = $("[name = 'city_id'] option:selected"),
                        shippingCityIdValue = shippingCityId.text();

                    address.city = shippingCityIdValue;

                    if (!this.source.get('params.invalid')) {
                        addressData = this.source.get('shippingAddress');
                        // if user clicked the checkbox, its value is true or false. Need to convert.
                        addressData['save_in_address_book'] = this.saveInAddressBook ? 1 : 0;

                        // New address must be selected as a shipping address
                        newShippingAddress = createShippingAddress(addressData);
                        selectShippingAddress(newShippingAddress);
                        checkoutData.setSelectedShippingAddress(newShippingAddress.getKey());
                        checkoutData.setNewCustomerShippingAddress($.extend(true, {}, addressData));
                        this.getPopUp().closeModal();
                        this.isNewAddressAdded(true);

                    }
                },
            });
        }
    });
