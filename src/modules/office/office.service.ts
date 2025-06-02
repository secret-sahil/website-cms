import { PrismaClient, Prisma, Office } from '@prisma/client';

const prisma = new PrismaClient();

export const createOffice = async (
  input: Prisma.OfficeUncheckedCreateInput,
  select?: Prisma.OfficeSelect,
) => {
  return (await prisma.office.create({
    data: input,
    select,
  })) as Office;
};

export const deleteOffice = async (where: Prisma.OfficeWhereUniqueInput) => {
  return (await prisma.office.delete({
    where,
  })) as Office;
};

export const updateOffice = async (
  where: Prisma.OfficeWhereUniqueInput,
  data: Prisma.OfficeUncheckedUpdateInput,
  select?: Prisma.OfficeSelect,
) => {
  return (await prisma.office.update({
    data,
    where,
    select,
  })) as Office;
};

export const getUniqueOffice = async (
  where: Prisma.OfficeWhereUniqueInput,
  select?: Prisma.OfficeSelect,
) => {
  return (await prisma.office.findUnique({
    where,
    select,
  })) as Office;
};

export const getAllOffice = async (
  search?: string,
  page: number = 1,
  pageSize?: number,
  where?: Prisma.OfficeWhereInput,
  select?: Prisma.OfficeSelect,
) => {
  const skip = pageSize ? (page - 1) * pageSize : 0;

  const [data, total] = await Promise.all([
    prisma.office.findMany({
      where: {
        ...where,
        name: {
          contains: search,
          mode: 'insensitive', // Optional: case-insensitive search
        },
      },
      skip,
      take: pageSize,
      select,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.office.count({
      where: {
        ...where,
        name: {
          contains: search,
          mode: 'insensitive', // Ensure the count query matches the findMany query
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  return {
    data,
    total,
    page,
    totalPages: pageSize ? Math.ceil(total / pageSize) : 1,
  };
};
