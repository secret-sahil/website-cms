import { PrismaClient, Prisma, Category } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory = async (
  input: Prisma.CategoryUncheckedCreateInput,
  select?: Prisma.CategorySelect,
) => {
  return (await prisma.category.create({
    data: input,
    select,
  })) as Category;
};

export const deleteCategory = async (where: Prisma.CategoryWhereUniqueInput) => {
  return (await prisma.category.delete({
    where,
  })) as Category;
};

export const updateCategory = async (
  where: Prisma.CategoryWhereUniqueInput,
  data: Prisma.CategoryUncheckedUpdateInput,
  select?: Prisma.CategorySelect,
) => {
  return (await prisma.category.update({
    data,
    where,
    select,
  })) as Category;
};

export const getUniqueCategory = async (
  where: Prisma.CategoryWhereUniqueInput,
  select?: Prisma.CategorySelect,
) => {
  return (await prisma.category.findUnique({
    where,
    select,
  })) as Category;
};

export const getAllCategory = async (
  search?: string,
  page: number = 1,
  pageSize?: number,
  where?: Prisma.CategoryWhereInput,
  select?: Prisma.CategorySelect,
) => {
  const skip = pageSize ? (page - 1) * pageSize : 0;

  const [data, total] = await Promise.all([
    prisma.category.findMany({
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
    prisma.category.count({
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
