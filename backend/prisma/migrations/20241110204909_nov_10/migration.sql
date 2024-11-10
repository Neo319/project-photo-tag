-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "resolution" JSONB NOT NULL,
    "locations" JSONB[],

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);
