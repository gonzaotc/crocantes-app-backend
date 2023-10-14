-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "symbol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "priceInUsd" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("symbol")
);

-- CreateTable
CREATE TABLE "CurrencyBalance" (
    "amount" DOUBLE PRECISION NOT NULL,
    "currencySymbol" TEXT NOT NULL,
    "financesProviderId" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "CurrencyBalance_pkey" PRIMARY KEY ("currencySymbol","financesProviderId")
);

-- CreateTable
CREATE TABLE "FinancesProvider" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "FinancesProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFinancesProvider" (
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,

    CONSTRAINT "UserFinancesProvider_pkey" PRIMARY KEY ("userId","providerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_userId_key" ON "Portfolio"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_symbol_key" ON "Currency"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FinancesProvider_name_key" ON "FinancesProvider"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FinancesProvider_symbol_key" ON "FinancesProvider"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "FinancesProvider_url_key" ON "FinancesProvider"("url");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyBalance" ADD CONSTRAINT "CurrencyBalance_currencySymbol_fkey" FOREIGN KEY ("currencySymbol") REFERENCES "Currency"("symbol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyBalance" ADD CONSTRAINT "CurrencyBalance_financesProviderId_fkey" FOREIGN KEY ("financesProviderId") REFERENCES "FinancesProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencyBalance" ADD CONSTRAINT "CurrencyBalance_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFinancesProvider" ADD CONSTRAINT "UserFinancesProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFinancesProvider" ADD CONSTRAINT "UserFinancesProvider_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "FinancesProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
