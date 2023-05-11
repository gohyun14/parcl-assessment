-- CreateTable
CREATE TABLE "Transaction" (
    "signature" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "blockTime" BIGINT NOT NULL,
    "blockNumber" BIGINT NOT NULL,
    "fee" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "previousBlockHash" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("signature")
);
