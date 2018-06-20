<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */

namespace Eadesigndev\RomCity\Model;

use Eadesigndev\RomCity\Api\Data\RomCityInterface;
use Magento\Framework\ObjectManagerInterface;

class RomCityFactory implements RomCityFactoryInterface
{
    /**
     * Object Manager instance
     *
     * @var ObjectManagerInterface
     */
    private $objectManager = null;

    /**
     * Instance name to create
     *
     * @var string
     */
    private $instanceName = null;

    /**
     * RomCityFactory constructor.
     * @param ObjectManagerInterface $objectManager
     * @param $instanceName
     */
    public function __construct(ObjectManagerInterface $objectManager, $instanceName = RomCityInterface::class)
    {
        $this->objectManager = $objectManager;
        $this->instanceName = $instanceName;
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create(array $data = [])
    {
        return $this->objectManager->create($this->instanceName, $data);
    }
}