<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */

namespace Eadesigndev\RomCity\Api\Quote\Data;

interface RomCityInterface
{
    const ENTITY_ID         = 'entity_id';
    const REGION_ID         = 'region_id';
    const CITY_ID           = 'city_id';
    const CITY_NAME         = 'city';
    
    
    public function getEntityId();

    public function getRegionId();
    
    public function getCityId();
    
    public function getCityName();


    public function setEntityId($entityId);

    public function setRegionId($regionId);
    
    public function setCityId($cityId);
    
    public function setCityName($cityName);
}
