<?php
/**
 * Copyright © 2018 EaDesign by Eco Active S.R.L. All rights reserved.
 * See LICENSE for license details.
 */

namespace Eadesigndev\RomCity\Setup;

use Eadesigndev\RomCity\Api\Data\RomCityInterface;
use Magento\Framework\Setup\InstallSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\DB\Ddl\Table;

//@codingStandardsIgnoreFile

/**
 * @codeCoverageIgnore
 */
class InstallSchema implements InstallSchemaInterface
{
    const TABLE = 'eadesign_romcity';

    /**
     * {@inheritdoc}
     */
    public function install(SchemaSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();

        $romCityTable = $setup->getTable(self::TABLE);

        if (!$setup->tableExists($romCityTable)) {
            $table = $setup->getConnection()->newTable(
                $setup->getTable(self::TABLE)
            )->addColumn(
                RomCityInterface::ENTITY_ID,
                Table::TYPE_SMALLINT,
                null,
                ['identity' => true, 'nullable' => false, 'primary' => true],
                'City Id'
            )->addColumn(
                RomCityInterface::REGION_ID,
                Table::TYPE_TEXT,
                255,
                ['nullable' => false],
                'Region Id'
            )->addColumn(
                RomCityInterface::CITY_NAME,
                Table::TYPE_TEXT,
                255,
                ['nullable' => false],
                'City Name'
            );
            $setup->getConnection()->createTable($table);
        }

        $setup->endSetup();
    }
}