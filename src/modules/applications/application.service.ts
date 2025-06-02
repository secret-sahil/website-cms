import { PrismaClient, Prisma, Application } from '@prisma/client';

const prisma = new PrismaClient();

export const createApplication = async (
  input: Prisma.ApplicationUncheckedCreateInput,
  select?: Prisma.ApplicationSelect,
) => {
  return (await prisma.application.create({
    data: input,
    select,
  })) as Application;
};

export const deleteApplication = async (where: Prisma.ApplicationWhereUniqueInput) => {
  return (await prisma.application.delete({
    where,
  })) as Application;
};

export const updateApplication = async (
  where: Prisma.ApplicationWhereUniqueInput,
  data: Prisma.ApplicationUncheckedUpdateInput,
  select?: Prisma.ApplicationSelect,
) => {
  return (await prisma.application.update({
    data,
    where,
    select,
  })) as Application;
};

export const getUniqueApplication = async (
  where: Prisma.ApplicationWhereUniqueInput,
  select?: Prisma.ApplicationSelect,
) => {
  return (await prisma.application.findUnique({
    where,
    select,
  })) as Application;
};

export const getAllApplication = async (
  search?: string,
  page: number = 1,
  pageSize?: number,
  where?: Prisma.ApplicationWhereInput,
  select?: Prisma.ApplicationSelect,
) => {
  const skip = pageSize ? (page - 1) * pageSize : 0;

  const [data, total] = await Promise.all([
    prisma.application.findMany({
      where: {
        ...where,
        email: {
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
    prisma.application.count({
      where: {
        ...where,
        email: {
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
