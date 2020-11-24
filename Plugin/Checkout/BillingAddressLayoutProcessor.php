<?php

namespace Eadesigndev\RomCity\Plugin\Checkout;

use Magento\Checkout\Block\Checkout\LayoutProcessor;

class BillingAddressLayoutProcessor
{

    public function afterProcess(
        LayoutProcessor $subject,
        array $result
    ) {
        $this->result = $result;

        $paymentForms = $result['components']['checkout']['children']['steps']['children']
        ['billing-step']['children']['payment']['children']
        ['payments-list']['children'];

        $paymentMethodForms = array_keys($paymentForms);

        if(isset($this->result['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['afterMethods']['children']['billing-address-form']['children'])){
            $this->addCityToAddressOnly();
            return $this->result;
        }

        if (!isset($paymentMethodForms)) {
            return $this->result;
        }

        foreach ($paymentMethodForms as $paymentMethodForm) {
            $paymentMethodCode = str_replace(
                '-form',
                '',
                $paymentMethodForm,
                $paymentMethodCode
            );
            $this->addField($paymentMethodForm, $paymentMethodCode);
            $this->changeCity($paymentMethodForm);
        }

        return $this->result;
    }

    private function addField(string $paymentMethodForm, string $paymentMethodCode): self
    {
        $cityId = $this->getCityId($paymentMethodCode);

        $this->result['components']['checkout']['children']['steps']['children']['billing-step']['children']
        ['payment']['children']['payments-list']['children'][$paymentMethodForm]['children']
        ['form-fields']['children']['city_id'] = $cityId;

        return $this;
    }

    private function changeCity(string $paymentMethodForm): self
    {
        if(isset($this->result['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['payments-list']['children'][$paymentMethodForm]['children']
            ['form-fields']['children']['city'])) {

            $city = $this->result['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['payments-list']['children'][$paymentMethodForm]['children']
            ['form-fields']['children']['city'];

            $city['component'] = 'Eadesigndev_RomCity/js/form/element/city';

            $this->result['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['payments-list']['children'][$paymentMethodForm]['children']
            ['form-fields']['children']['city'] = $city;
        }

        return $this;
    }

    private function addCityToAddressOnly()
    {
        if (isset($this->result['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['afterMethods']['children']['billing-address-form']['children']
            ['form-fields']['children']['city'])) {

            $city = $this->result['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['afterMethods']['children']['billing-address-form']['children']
            ['form-fields']['children']['city'];

            $city['component'] = 'Eadesigndev_RomCity/js/form/element/city';

            $this->result['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['afterMethods']['children']['billing-address-form']['children']
            ['form-fields']['children']['city'] = $city;

            $this->result['components']['checkout']['children']['steps']['children']['billing-step']['children']
            ['payment']['children']['afterMethods']['children']['billing-address-form']['children']
            ['form-fields']['children']['city_id'] = $this->getCityId('shared');
        }
    }

    private function getCityId(string $paymentMethodCode): array
    {
        return [
            'component' => 'Eadesigndev_RomCity/js/form/element/city-select',
            'config' => [
                'customScope' => 'billingAddress' . $paymentMethodCode,
                'template' => 'ui/form/field',
                'elementTmpl' => 'ui/form/element/select',
                'id' => 'city_id'
            ],
            'label' => 'City',
            'value' => '',
            'dataScope' => 'customCheckoutForm.city_id',
            'provider' => 'checkoutProvider',
            'sortOrder' => 100,
            'customEntry' => null,
            'visible' => true,
            'options' => [

            ],
            'validation' => [
                'required-entry' => true
            ],
            'id' => 'city_id'
        ];
    }
}
