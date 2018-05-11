<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */
namespace ShopGo\CheckoutCity\Model\Quote\GuestCart;

use Eadesigndev\RomCity\Api\Quote\ShippingMethodManagementInterface;
use Eadesigndev\RomCity\Api\Quote\Data\EstimateAddressInterface;
use Eadesigndev\RomCity\Api\Quote\GuestShippingMethodManagementInterface as GuestShippingMethodInterface;
use Magento\Quote\Model\GuestCart\GuestShippingMethodManagement as MagentoGuestShippingMethodManagement;
use Magento\Quote\Model\QuoteIdMaskFactory;

/**
 * Shipping method management class for guest carts.
 */
class GuestShippingMethodManagement extends MagentoGuestShippingMethodManagement implements GuestShippingMethodInterface
{
    /**
     * @var ShippingMethodManagementInterface
     */
    private $shippingMethodManagement;

    /**
     * @var QuoteIdMaskFactory
     */
    private $quoteIdMaskFactory;

    /**
     * Constructs a shipping method read service object.
     *
     * @param ShippingMethodManagementInterface $shippingMethodManagement
     * @param QuoteIdMaskFactory $quoteIdMaskFactory
     */
    public function __construct(
        ShippingMethodManagementInterface $shippingMethodManagement,
        QuoteIdMaskFactory $quoteIdMaskFactory
    ) {
        $this->shippingMethodManagement = $shippingMethodManagement;
        $this->quoteIdMaskFactory = $quoteIdMaskFactory;
    }

    /**
     * {@inheritDoc}
     */
    public function estimateRatesByAddress($cartId, EstimateAddressInterface $address)
    {
        /** @var $quoteIdMask QuoteIdMask */
        $quoteIdMask = $this->quoteIdMaskFactory->create()->load($cartId, 'masked_id');
        return $this->shippingMethodManagement->estimateRatesByAddress($quoteIdMask->getQuoteId(), $address);
    }
}