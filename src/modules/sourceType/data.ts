import prisma from "../../db";

export const fetchSourceTypes = async () => {
  const sourceTypes = await prisma.sourceType.findMany();
  return sourceTypes;
};

export const fetchSourceType = async (id: string) => {
  const sourceType = await prisma.sourceType.findUnique({
    where: { id },
  });
  return sourceType;
};

export const addSourceType = async (name: string, symbol: string, url?: string) => {
  const sourceType = await prisma.sourceType.create({
    data: { name, symbol, url }, // If url is undefined (not provided), Prisma will set it to null
  });
  return sourceType;
};
