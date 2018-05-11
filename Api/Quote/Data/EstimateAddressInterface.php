<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */
namespace Eadesigndev\RomCity\Api\Quote\Data;

use Magento\Quote\Api\Data\EstimateAddressInterface as MagentoDataEstimateAddressInterface;

/**
 * Interface EstimateAddressInterface
 * @api
 */
interface EstimateAddressInterface extends MagentoDataEstimateAddressInterface
{
    /**#@+
     * Constants defined for keys of array, makes typos less likely
     */
    const KEY_CITY = 'city';

    /**#@-*/

    /**
     * Get city
     *
     * @return string
     */
    public function getCity();

    /**
     * Set city
     *
     * @param string $city
     * @return $this
     */
    public function setCity($city);
}