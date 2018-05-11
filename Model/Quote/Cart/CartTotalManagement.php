<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */
namespace Eadesigndev\RomCity\Model\Quote\Cart;

use Eadesigndev\RomCity\Api\Quote\ShippingMethodManagementInterface;
use Magento\Quote\Api\PaymentMethodManagementInterface;
use Magento\Quote\Api\CartTotalRepositoryInterface;
use Magento\Quote\Model\Cart\TotalsAdditionalDataProcessor;
use Magento\Quote\Model\Cart\CartTotalManagement as MagentoQuoteCartTotalManagement;

/**
 * @inheritDoc
 */
class CartTotalManagement extends MagentoQuoteCartTotalManagement
{
    /**
     * @param ShippingMethodManagementInterface $shippingMethodManagement
     * @param PaymentMethodManagementInterface $paymentMethodManagement
     * @param CartTotalRepositoryInterface $cartTotalsRepository
     * @param TotalsAdditionalDataProcessor $dataProcessor
     */
    public function __construct(
        ShippingMethodManagementInterface $shippingMethodManagement,
        PaymentMethodManagementInterface $paymentMethodManagement,
        CartTotalRepositoryInterface $cartTotalsRepository,
        TotalsAdditionalDataProcessor $dataProcessor
    ) {
        $this->shippingMethodManagement = $shippingMethodManagement;
        $this->paymentMethodManagement  = $paymentMethodManagement;
        $this->cartTotalsRepository     = $cartTotalsRepository;
        $this->dataProcessor            = $dataProcessor;
    }
}