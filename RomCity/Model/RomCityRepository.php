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
use Magento\Framework\Api\SearchCriteriaInterface;
use Eadesigndev\RomCity\Model\ResourceModel\Collection\Collection;
use Eadesigndev\RomCity\Model\ResourceModel\Collection\CollectionFactory;
use Eadesigndev\RomCity\Api\Data\CitySearchResultInterfaceFactory;

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

    private $citySearchResultInterfaceFactory;

    private $collectionFactory;

    /**
     * @var ManagerInterface
     */
    private $messageManager;

    /**
     * RomCityRepository constructor.
     * @param RomCityResourceModel $romCityResourceModel
     * @param RomCityInterface $romCityInterface
     * @param RomCityFactory $romCityFactory
     * @param CollectionFactory $collectionFactory
     * @param CitySearchResultInterfaceFactory $citySearchResultInterfaceFactory
     * @param ManagerInterface $messageManager
     */
    public function __construct(
        RomCityResourceModel $romCityResourceModel,
        RomCityInterface $romCityInterface,
        RomCityFactory $romCityFactory,
        ManagerInterface $messageManager,
        CollectionFactory $collectionFactory,
        CitySearchResultInterfaceFactory $citySearchResultInterfaceFactory
    ) {
        $this->citySearchResultInterfaceFactory = $citySearchResultInterfaceFactory;
        $this->romCityResourceModel = $romCityResourceModel;
        $this->collectionFactory = $collectionFactory;
        $this->romCityInterface = $romCityInterface;
        $this->romCityFactory = $romCityFactory;
        $this->messageManager = $messageManager;
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
                    'There was a error while saving the city ' . $e->getMessage()
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


    public function getList(SearchCriteriaInterface $searchCriteria)
    {
        $collection = $this->collectionFactory->create();
        $this->addFiltersToCollection($searchCriteria, $collection);
        $this->addSortOrdersToCollection($searchCriteria, $collection);
        $this->addPagingToCollection($searchCriteria, $collection);
        $collection->load();
        return $this->buildSearchResult($searchCriteria, $collection);
    }

    private function addFiltersToCollection(SearchCriteriaInterface $searchCriteria, Collection $collection)
    {
        foreach ($searchCriteria->getFilterGroups() as $filterGroup) {
            $fields = $conditions = [];
            foreach ($filterGroup->getFilters() as $filter) {
                $fields[] = $filter->getField();
                $conditions[] = [$filter->getConditionType() => $filter->getValue()];
            }
            $collection->addFieldToFilter($fields, $conditions);
        }
    }

    private function addSortOrdersToCollection(SearchCriteriaInterface $searchCriteria, Collection $collection)
    {
        foreach ((array)$searchCriteria->getSortOrders() as $sortOrder) {
            $direction = $sortOrder->getDirection() == SortOrder::SORT_ASC ? 'asc' : 'desc';
            $collection->addOrder($sortOrder->getField(), $direction);
        }
    }

    private function addPagingToCollection(SearchCriteriaInterface $searchCriteria, Collection $collection)
    {
        $collection->setPageSize($searchCriteria->getPageSize());
        $collection->setCurPage($searchCriteria->getCurrentPage());
    }

    private function buildSearchResult(SearchCriteriaInterface $searchCriteria, Collection $collection)
    {
        $searchResults = $this->citySearchResultInterfaceFactory->create();
        $searchResults->setSearchCriteria($searchCriteria);
        $searchResults->setItems($collection->getItems());
        $searchResults->setTotalCount($collection->getSize());
        return $searchResults;
    }
}