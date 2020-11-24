<?php

namespace Eadesigndev\RomCity\Plugin\Checkout;

use Magento\Checkout\Block\Checkout\LayoutProcessor;

/**
 * Class BillingAddressLayoutProcessor
 * @package Eadesigndev\RomCity\Plugin\Checkout
 */
class BillingAddressLayoutProcessor
{
    /**
     * @param LayoutProcessor $subject
     * @param array $result
     * @return array
     */
    public function afterProcess(
        LayoutProcessor $subject,
        array $result
    ) {
        $this->result = $result;

        $paymentForms = $result['components']['checkout']['children']['steps']['children']
        ['billing-step']['children']['payment']['children']
        ['payments-list']['children'];

        $paymentMethodForms = array_keys($paymentForms);

        if (!isset($paymentMethodForms)) {
            return $result;
        }

        foreach ($paymentMethodForms as $paymentMethodForm) {
            $paymentMethodCode = str_replace(
                '-form',
                '',
                $paymentMethodForm,
                $paymentMethodCode
            );
            $this->addField($paymentMethodForm, $paymentMethodCode);
        }

        return $this->result;
    }
    /**
     * @param $paymentMethodForm
     * @param $paymentMethodCode
     * @return $this
     */
    private function addField($paymentMethodForm, $paymentMethodCode)
    {
        $field = [
            'component' => 'Eadesigndev_RomCity/js/form/element/city',
            'config' => [
                'customScope' => 'billingAddress' . $paymentMethodCode,
                'template' => 'ui/form/field',
                'elementTmpl' => 'ui/form/element/select',
                'id' => 'city_id'
            ],
            'label' => 'City',
            'value' => 'value_2',
            'dataScope' => 'customCheckoutForm.city_id',
            'provider' => 'checkoutProvider',
            'sortOrder' => 100,
            'customEntry' => null,
            'visible' => true,
            'options' => [
              
            ],
            'filterBy' => [
                'target' => '<![CDATA[${ $.provider }:${ $.parentScope }.region_id]]>',
                'field' => 'region_id'
            ],
            'validation' => [
                'required-entry' => true
            ],
            'id' => 'city_id'
        ];
        
        $this->result['components']['checkout']['children']['steps']['children']['billing-step']['children']
        ['payment']['children']['payments-list']['children'][$paymentMethodForm]['children']
        ['form-fields']['children']['city_id'] = $field;

        return $this;
    }
}