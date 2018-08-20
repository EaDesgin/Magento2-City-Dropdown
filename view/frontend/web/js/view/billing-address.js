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
        'Magento_Customer/js/customer-data',

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
              customerData
    ) {
        'use strict';
        var lastSelectedBillingAddress = null,
            newAddressOption = {
                /**
                 * Get new address label
                 * @returns {String}
                 */
                getAddressInline: function () {
                    return $t('New Address');
                },
                customerAddressId: null
            },
            countryData = customerData.get('directory-data'),
            addressOptions = addressList().filter(function (address) {
                return address.getType() == 'customer-address'; //eslint-disable-line eqeqeq
            });
        return function (Component) {
            return Component.extend({
                initObservable: function () {
                    this._super()
                        .observe({
                            selectedAddress: null,
                            isAddressDetailsVisible: quote.billingAddress() != null,
                            isAddressFormVisible: !customer.isLoggedIn() || addressOptions.length === 1,
                            isAddressSameAsShipping: false,
                            saveInAddressBook: 1
                        });

                    quote.billingAddress.subscribe(function (newAddress) {

                        var shippingCityId = $("#shipping-new-address-form [name = 'city_id'] option:selected"),
                            shippingCityIdValue = shippingCityId.text();

                        newAddress.city = shippingCityIdValue;

                        if (quote.isVirtual()) {
                            this.isAddressSameAsShipping(false);
                        } else {
                            this.isAddressSameAsShipping(
                                newAddress != null &&
                                newAddress.getCacheKey() == quote.shippingAddress().getCacheKey() //eslint-disable-line eqeqeq
                            );
                        }

                        if (newAddress != null && newAddress.saveInAddressBook !== undefined) {
                            this.saveInAddressBook(newAddress.saveInAddressBook);
                        } else {
                            this.saveInAddressBook(1);
                        }
                        this.isAddressDetailsVisible(true);
                    }, this);

                    return this;
                },
                useShippingAddress: function () {
                    if (this.isAddressSameAsShipping()) {
                        selectBillingAddress(quote.shippingAddress());
                        this.updateAddresses();
                        this.isAddressDetailsVisible(true);

                    } else {
                        lastSelectedBillingAddress = quote.billingAddress();
                        quote.billingAddress(null);
                        this.isAddressDetailsVisible(false);
                    }

                    checkoutData.setSelectedBillingAddress(null);


                    return true;
                },
                updateAddress: function () {
                    var addressData, newBillingAddress, billingCityId, billingCityIdValue;

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
                            billingCityId = $("#billing-new-address-form [name = 'city_id'] option:selected"),
                                billingCityIdValue = billingCityId.text();
                        }
                    }

                    newBillingAddress.city = billingCityIdValue;

                    this.updateAddresses();
                },
            });
        }
    });
