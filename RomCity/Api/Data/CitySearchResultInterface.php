<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */

namespace Eadesigndev\RomCity\Api\Data;

use Magento\Framework\Api\SearchResultsInterface;

interface CitySearchResultInterface extends SearchResultsInterface
{
    public function getItems();

    public function setItems(array $items);
}