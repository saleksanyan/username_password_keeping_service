import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718372562203 implements MigrationInterface {
    name = 'Migration1718372562203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "account_info_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "userId" uuid,
                CONSTRAINT "UQ_1237e1db0f170968f030ee5ff22" UNIQUE ("username"),
                CONSTRAINT "PK_1dff13c379a62175624723892a9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "account_info_entity"
            ADD CONSTRAINT "FK_acae8eb933348f67be3d42be7c7" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "account_info_entity" DROP CONSTRAINT "FK_acae8eb933348f67be3d42be7c7"
        `);
        await queryRunner.query(`
            DROP TABLE "user_entity"
        `);
        await queryRunner.query(`
            DROP TABLE "account_info_entity"
        `);
    }

}
