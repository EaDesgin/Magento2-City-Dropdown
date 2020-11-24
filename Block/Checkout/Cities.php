<?php

namespace Eadesigndev\RomCity\Block\Checkout;

use Eadesigndev\RomCity\Model\RomCityRepository;
use Eadesigndev\RomCity\Model\RomCity;
use Eadesigndev\RomCity\Model\ResourceModel\Collection\Collection;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\View\Element\Template;
use Magento\Directory\Helper\Data;

/**
 * Class Cities
 * @package Eadesigndev\RomCity\Block\Checkout
 */
class Cities extends Template
{
    private $helperData;

    private $romCityRepository;

    private $romCityModel;

    private $collection;

    private $searchCriteria;

    public function __construct(
        Template\Context $context,
        Data $helperData,
        RomCity $romCityModel,
        Collection $collection,
        RomCityRepository $romCityRepository,
        SearchCriteriaBuilder $searchCriteria,
        array $data = []
    ) {
        $this->romCityModel = $romCityModel;
        $this->searchCriteria = $searchCriteria;
        $this->collection = $collection;
        $this->helperData   = $helperData;
        $this->romCityRepository = $romCityRepository;
        parent::__construct($context, $data);
    }

    public function citiesJson()
    {
        $countriesJson = $this->helperData->getRegionJson();
        $countriesArray = json_decode($countriesJson, true);

        $searchCriteriaBuilder = $this->searchCriteria;
        $searchCriteria = $searchCriteriaBuilder->create();

        $citiesList = $this->romCityRepository->getList($searchCriteria);
        $items = $citiesList->getItems();

        /** @var RomCity $item */
        foreach ($items as $item) {
            $citiesData[$item->getEntityId()] = $item;
        }

        $countriesArrayUpdated = [];
        foreach ($countriesArray as $key => $country) {
            if ($key == 'config') {
                $countriesArrayUpdated[$key] = $country;
            }

            $regions = [];
            foreach ($country as $regionId => $region) {
                foreach ($citiesData as $cityId => $cityData) {
                    $entityId = $cityData->getRegionId();
                    if ($entityId == $regionId) {
                        $id       = $cityData->getId();
                        $cityName = $cityData->getCityName();
                        $region['cities'][$id] = [
                            'name' => $cityName,
                            'id' => $cityId
                        ];
                    }
                }

                $regions[$regionId] = $region;
            }
            $countriesArrayUpdated[$key] = $regions;
        }

        $countriesJsonUpdated = json_encode($countriesArrayUpdated);

        return $countriesJsonUpdated;
    }
}