<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */

namespace Eadesigndev\RomCity\Api;

use Eadesigndev\RomCity\Api\Data\RomCityInterface;

interface RomCityRepositoryInterface
{
    /**
     * @param RomCityInterface $templates
     * @return mixed
     */
    public function save(RomCityInterface $templates);

    /**
     * @param $value
     * @return mixed
     */
    public function getById($value);

    /**
     * @param RomCityInterface $templates
     * @return mixed
     */
    public function delete(RomCityInterface $templates);

    /**
     * @param $value
     * @return mixed
     */
    public function deleteById($value);
}