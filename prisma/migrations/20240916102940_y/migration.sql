-- CreateTable
CREATE TABLE "CommitSchedule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "dayOfWeek" INTEGER,
    "time" TEXT NOT NULL,
    "customDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommitSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommitSchedule_userId_frequency_key" ON "CommitSchedule"("userId", "frequency");
