<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */

namespace Eadesigndev\RomCity\Controller\Adminhtml\Index;

use Eadesigndev\RomCity\Helper\Data;
use Eadesigndev\RomCity\Model\RomCityFactory;
use Eadesigndev\RomCity\Model\ResourceModel\Collection\City\Grid\Collection;
use Eadesigndev\RomCity\Model\ResourceModel\Collection\City\Grid\CollectionFactory;
use Magento\Backend\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
use Magento\Framework\Controller\ResultFactory;
use Magento\Backend\App\Action;
use Magento\Framework\File\Csv;
use Magento\Framework\Module\Dir\Reader;
use Magento\Framework\App\Filesystem\DirectoryList;

class Upload extends Action
{
    /**
     * Authorization level of a basic admin session
     *
     * @see _isAllowed()
     */
    const ADMIN_RESOURCE = 'Eadesigndev_RomCity::romcity';

    protected $resultPageFactory;

    private $csvProccesor;

    private $moduleReader;

    private $directoryList;

    private $dataHelper;

    private $collectionFactory;

    private $romCityFactory;

    private $resultRedirect;

    public function __construct(
        Context $context,
        Csv $csvProccesor,
        Reader $moduleReader,
        PageFactory $resultPageFactory,
        DirectoryList $directoryList,
        CollectionFactory $collectionFactory,
        ResultFactory $resultRedirect,
        RomCityFactory $romCityFactory,
        Data $dataHelper
    ) {
        $this->resultRedirect    = $resultRedirect;
        $this->romCityFactory    = $romCityFactory;
        $this->collectionFactory = $collectionFactory;
        $this->dataHelper        = $dataHelper;
        $this->directoryList     = $directoryList;
        $this->moduleReader      = $moduleReader;
        $this->csvProccesor      = $csvProccesor;
        $this->resultPageFactory = $resultPageFactory;
        parent::__construct($context);
    }

    /**
     * Index action list city.
     * @return $resultRedirect
     */
    public function execute()
    {
        $resultRedirect = $this->resultRedirectFactory->create();
        $url = $this->_redirect->getRefererUrl();
        $resultRedirect->setUrl($url);

        $this->readCsv();

        return $resultRedirect;
    }

    public function readCsv()
    {
        $pubMediaDir = $this->directoryList->getPath(DirectoryList::MEDIA);
        $fieName = $this->dataHelper->getConfigFileName();
        $ds = DIRECTORY_SEPARATOR;
        $dirTest = '/test';

        $file = $pubMediaDir . $dirTest . $ds . $fieName;

        if (!empty($file)) {
            $csvData = $this->csvProccesor->getData($file);

            $csvDataProcessed = [];
            unset($csvData[0]);

            /** @var Collection $collection */
            $collection = $this->collectionFactory->create();

            foreach ($csvData as $csvValue) {
                $csvValueProcessed = [];
                foreach ($csvValue as $key => $value) {
                    if ($key == 0) {
                        $csvValueProcessed['entity_id'] = $value;
                    }

                    if ($key == 1) {
                        $csvValueProcessed['region_id'] = $value;
                    }

                    if ($key == 2) {
                        $csvValueProcessed['city_id'] = $value;
                    }

                    if ($key == 3) {
                        $csvValueProcessed['city'] = $value;
                    }
                }
                $csvDataProcessed[] = $csvValueProcessed;
            }

            foreach ($csvDataProcessed as $dataRow) {
                $regionId = $dataRow['region_id'];
                $cityName = $dataRow['city'];
                $entityId = $dataRow['entity_id'];

                $romCityFactory = $this->romCityFactory->create();
                if (isset($entityId) && is_numeric($entityId)) {
                    $romCityFactory->setId($entityId);
                }
                $romCityFactory->setRegionId($regionId);
                $romCityFactory->setCityName($cityName);

                $collection->addItem($romCityFactory);
            }
        }
        $collection->walk('save');
    }

    /**
     * @return bool
     */
    public function _isAllowed()
    {
        return $this->_authorization->isAllowed(self::ADMIN_RESOURCE);
    }
}
