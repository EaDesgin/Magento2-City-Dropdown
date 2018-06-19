<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */

namespace Eadesigndev\RomCity\Model;

use Eadesigndev\RomCity\Api\Data\RomCityInterface;
use Eadesigndev\RomCity\Model\ResourceModel\RomCity as RomCityResourceModel;
use Eadesigndev\RomCity\Api\RomCityRepositoryInterface;
use Magento\Framework\Exception\LocalizedException as Exception;
use Magento\Framework\Message\ManagerInterface;

/**
 * Class RomCityRepository
 * @package Eadesigndev\RomCity\Model
 */
class RomCityRepository implements RomCityRepositoryInterface
{
    /**
     * @var array
     */
    private $instances = [];

    /**
     * @var RomCityResourceModel
     */
    private $romCityResourceModel;

    /**
     * @var RomCityInterface
     */
    private $romCityInterface;

    /**
     * @var RomCityFactory
     */
    private $romCityFactory;

    /**
     * @var ManagerInterface
     */
    private $messageManager;

    /**
     * RomCityRepository constructor.
     * @param RomCityResourceModel $romCityResourceModel
     * @param RomCityInterface $romCityInterface
     * @param RomCityFactory $romCityFactory
     * @param ManagerInterface $messageManager
     */
    public function __construct(
        RomCityResourceModel $romCityResourceModel,
        RomCityInterface $romCityInterface,
        RomCityFactory $romCityFactory,
        ManagerInterface $messageManager
    ) {
        $this->romCityResourceModel        = $romCityResourceModel;
        $this->romCityInterface            = $romCityInterface;
        $this->romCityFactory              = $romCityFactory;
        $this->messageManager              = $messageManager;
    }

    /**
     * @param RomCityInterface $romCityInterface
     * @return RomCityInterface
     * @throws \Exception
     */
    public function save(RomCityInterface $romCityInterface)
    {
        try {
            $this->romCityResourceModel->save($romCityInterface);
        } catch (Exception $e) {
            $this->messageManager
                ->addExceptionMessage(
                    $e,
                    'There was a error while saving the city '. $e->getMessage()
                );
        }

        return $romCityInterface;
    }

    /**
     * @param $$romCityId
     * @return array
     */
    public function getById($romCityId)
    {
        if (!isset($this->instances[$romCityId])) {
            $romCity = $this->romCityFactory->create();
            $this->romCityResourceModel->load($romCity, $romCityId);
            $this->instances[$romCityId] = $romCity;
        }
        return $this->instances[$romCityId];
    }

    /**
     * @param RomCityInterface $romCityInterface
     * @return bool
     * @throws \Exception
     */
    public function delete(RomCityInterface $romCityInterface)
    {
        $id = $romCityInterface->getId();
        try {
            unset($this->instances[$id]);
            $this->romCityResourceModel->delete($romCityInterface);
        } catch (Exception $e) {
            $this->messageManager
                ->addExceptionMessage($e, 'There was a error while deleting the city');
        }
        unset($this->instances[$id]);
        return true;
    }

    /**
     * @param $romCityId
     * @return bool
     * @throws \Exception
     */
    public function deleteById($romCityId)
    {
        $romCity = $this->getById($romCityId);
        return $this->delete($romCity);
    }

    /**
     * @param RomCityInterface $romCityInterface
     * @return bool
     * @throws \Exception
     */
    public function saveAndDelete(RomCityInterface $romCityInterface)
    {
        $romCityInterface->setData(Data::ACTION, Data::DELETE);
        $this->save($romCityInterface);
        return true;
    }

    /**
     * @param $romCityId
     * @return bool
     * @throws \Exception
     */
    public function saveAndDeleteById($romCityId)
    {
        $romCity = $this->getById($romCityId);
        return $this->saveAndDelete($romCity);
    }
}