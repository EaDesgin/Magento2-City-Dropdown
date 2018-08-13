define(['jquery',
        'ko',
        'underscore',
        'Magento_Ui/js/form/form',
        'Magento_Customer/js/model/customer',
        'Magento_Customer/js/model/address-list',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/action/create-billing-address',
        'Magento_Checkout/js/action/select-billing-address',
        'Magento_Checkout/js/checkout-data',
    ],
    function ($,
              ko,
              _,
              Component,
              customer,
              addressList,
              quote,
              createBillingAddress,
              selectBillingAddress,
              checkoutData,
    ) {
        'use strict';

        return function (Component) {
            return Component.extend({
                updateAddress: function () {
                    var addressData, newBillingAddress;

                    if (this.selectedAddress() && this.selectedAddress() != newAddressOption) { //eslint-disable-line eqeqeq
                        selectBillingAddress(this.selectedAddress());
                        checkoutData.setSelectedBillingAddress(this.selectedAddress().getKey());
                    } else {
                        this.source.set('params.invalid', false);
                        this.source.trigger(this.dataScopePrefix + '.data.validate');

                        if (this.source.get(this.dataScopePrefix + '.custom_attributes')) {
                            this.source.trigger(this.dataScopePrefix + '.custom_attributes.data.validate');
                        }

                        if (!this.source.get('params.invalid')) {
                            addressData = this.source.get(this.dataScopePrefix);

                            if (customer.isLoggedIn() && !this.customerHasAddresses) { //eslint-disable-line max-depth
                                this.saveInAddressBook(1);
                            }
                            addressData['save_in_address_book'] = this.saveInAddressBook() ? 1 : 0;
                            newBillingAddress = createBillingAddress(addressData);

                            // New address must be selected as a billing address
                            selectBillingAddress(newBillingAddress);
                            checkoutData.setSelectedBillingAddress(newBillingAddress.getKey());
                            checkoutData.setNewCustomerBillingAddress(addressData);


                            var billingCityId = $("#billing-new-address-form [name = 'city_id'] option:selected"),
                                billingCityIdValue = billingCityId.text();
                            
                             newBillingAddress.city = billingCityIdValue;
                        }
                    }
                    this.updateAddresses();
                },
            });
        }
    });
