<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */

namespace Eadesigndev\RomCity\Controller\Adminhtml\Index;

use Eadesigndev\RomCity\Helper\Data;
use Magento\Backend\App\Action\Context;
use Magento\Framework\View\Result\PageFactory;
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


    public function __construct(
        Context $context,
        Csv $csvProccesor,
        Reader $moduleReader,
        PageFactory $resultPageFactory,
        DirectoryList $directoryList,
        Data $dataHelper
    ) {
        $this->dataHelper    = $dataHelper;
        $this->directoryList = $directoryList;
        $this->moduleReader  = $moduleReader;
        $this->csvProccesor  = $csvProccesor;
        $this->resultPageFactory = $resultPageFactory;
        parent::__construct($context);
    }

    /**
     * Index action list city.
     *
     * @return \Magento\Backend\Model\View\Result\Page
     */
    public function execute()
    {
        /** @var \Magento\Backend\Model\View\Result\Page $resultPage */
        $resultPage = $this->resultPageFactory->create();
        $resultPage->addBreadcrumb(__('Upload City'), __('Manage Upload City List'));
        $resultPage->getConfig()->getTitle()->prepend(__('Upload City'));

        $test = $this->readCsv();
        $test;

        return $resultPage;
    }

    public function readCsv()
    {
        $pubMediaDir = $this->directoryList->getPath(DirectoryList::MEDIA);
        $fieName     = $this->dataHelper->getConfigFileName();
        $ds          = DIRECTORY_SEPARATOR;
        $dirTest     = '/test';

        $file = $pubMediaDir . $dirTest . $ds . $fieName;

        if (file_exists($file)) {
            $data = $this->csvProccesor->getData($file);
            // This skips the first line of your csv file, since it will probably be a heading. Set $i = 0 to not skip the first line.
            for ($i = 1; $i < count($data); $i++) {
                var_dump($data[$i]); // $data[$i] is an array with your csv columns as values.
            }
        }
    }

    /**
     * @return bool
     */
    public function _isAllowed()
    {
        return $this->_authorization->isAllowed(self::ADMIN_RESOURCE);
    }
}
