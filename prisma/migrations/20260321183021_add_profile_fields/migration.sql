/*
  Warnings:

  - Added the required column `wallet` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "wallet" TEXT NOT NULL,
    "displayName" TEXT,
    "handle" TEXT,
    "accountType" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "signalScore" INTEGER NOT NULL DEFAULT 0,
    "specialty" TEXT,
    "twitter" TEXT,
    "discord" TEXT,
    "telegram" TEXT,
    "linkedAgentWallet" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("accountType", "avatarUrl", "createdAt", "displayName", "handle", "id", "signalScore", "specialty", "updatedAt") SELECT "accountType", "avatarUrl", "createdAt", "displayName", "handle", "id", "signalScore", "specialty", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
