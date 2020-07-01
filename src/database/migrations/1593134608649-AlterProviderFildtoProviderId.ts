import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterProviderFildtoProviderId1593134608649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider_id',
            type:'uuid',
            isNullable: true
        }))
        await queryRunner.createForeignKey('appointments',new TableForeignKey({
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',//RESTRIC, SET NULL// CASCADE
            onUpdate: 'CASCADE',
            name: 'appointment_provider'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments','appointment_provider');
        await queryRunner.dropColumn('appointments', 'privider_id');
        await queryRunner. addColumn('appointments', new TableColumn({
            name: 'provider',
            type: 'varchar'
        }))
    }
}
