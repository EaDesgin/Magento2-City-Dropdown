<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */
namespace Eadesigndev\RomCity\Api\Quote;

use Eadesigndev\RomCity\Api\Quote\Data\EstimateAddressInterface;

/**
 * Interface ShippingMethodManagementInterface
 * @api
 */
interface ShippingMethodManagementInterface extends \Magento\Quote\Model\ShippingMethodManagementInterface
{
    /**
     * Estimate shipping
     *
     * @param int $cartId The shopping cart ID.
     * @param EstimateAddressInterface $address The estimate address
     * @return \Magento\Quote\Api\Data\ShippingMethodInterface[] An array of shipping methods.
     */
    public function estimateRatesByAddress($cartId, EstimateAddressInterface $address);
}