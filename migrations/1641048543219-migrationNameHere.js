const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class migrationNameHere1641048543219 {
    name = 'migrationNameHere1641048543219'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_coupon" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "discount" integer NOT NULL DEFAULT (10), "isUsed" boolean NOT NULL DEFAULT (0), "userId" integer, "code" varchar NOT NULL DEFAULT ('codenaja'), CONSTRAINT "REL_03de14bf5e5b4410fced2ca993" UNIQUE ("userId"), CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_coupon"("id", "discount", "isUsed", "userId", "code") SELECT "id", "discount", "isUsed", "userId", "code" FROM "coupon"`);
        await queryRunner.query(`DROP TABLE "coupon"`);
        await queryRunner.query(`ALTER TABLE "temporary_coupon" RENAME TO "coupon"`);
        await queryRunner.query(`CREATE TABLE "temporary_coupon" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "discount" integer NOT NULL DEFAULT (10), "isUsed" boolean NOT NULL DEFAULT (0), "userId" integer, "code" varchar NOT NULL DEFAULT ('codenaja'), "ice" varchar NOT NULL DEFAULT ('ice'), CONSTRAINT "REL_03de14bf5e5b4410fced2ca993" UNIQUE ("userId"), CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_coupon"("id", "discount", "isUsed", "userId", "code") SELECT "id", "discount", "isUsed", "userId", "code" FROM "coupon"`);
        await queryRunner.query(`DROP TABLE "coupon"`);
        await queryRunner.query(`ALTER TABLE "temporary_coupon" RENAME TO "coupon"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coupon" RENAME TO "temporary_coupon"`);
        await queryRunner.query(`CREATE TABLE "coupon" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "discount" integer NOT NULL DEFAULT (10), "isUsed" boolean NOT NULL DEFAULT (0), "userId" integer, "code" varchar NOT NULL DEFAULT ('codenaja'), CONSTRAINT "REL_03de14bf5e5b4410fced2ca993" UNIQUE ("userId"), CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "coupon"("id", "discount", "isUsed", "userId", "code") SELECT "id", "discount", "isUsed", "userId", "code" FROM "temporary_coupon"`);
        await queryRunner.query(`DROP TABLE "temporary_coupon"`);
        await queryRunner.query(`ALTER TABLE "coupon" RENAME TO "temporary_coupon"`);
        await queryRunner.query(`CREATE TABLE "coupon" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "discount" integer NOT NULL DEFAULT (10), "isUsed" boolean NOT NULL DEFAULT (0), "userId" integer, "code" varchar NOT NULL DEFAULT ('codenaja'), "ice" varchar NOT NULL DEFAULT ('ice'), CONSTRAINT "REL_03de14bf5e5b4410fced2ca993" UNIQUE ("userId"), CONSTRAINT "FK_03de14bf5e5b4410fced2ca9935" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "coupon"("id", "discount", "isUsed", "userId", "code") SELECT "id", "discount", "isUsed", "userId", "code" FROM "temporary_coupon"`);
        await queryRunner.query(`DROP TABLE "temporary_coupon"`);
    }
}
