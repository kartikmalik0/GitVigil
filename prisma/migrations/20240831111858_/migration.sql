-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" TEXT,
ALTER COLUMN "email" DROP NOT NULL;
