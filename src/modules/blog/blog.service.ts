import { PrismaClient, Prisma, Blog } from '@prisma/client';
const prisma = new PrismaClient();

export const createBlog = async (
  input: Prisma.BlogUncheckedCreateInput,
  select?: Prisma.BlogSelect,
) => {
  return (await prisma.blog.create({
    data: input,
    select,
  })) as Blog;
};

export const deleteBlog = async (where: Prisma.BlogWhereUniqueInput) => {
  return (await prisma.blog.delete({
    where: {
      ...where,
      isDeleted: false,
    },
  })) as Blog;
};

export const updateBlog = async (
  where: Prisma.BlogWhereUniqueInput,
  data: Prisma.BlogUncheckedUpdateInput,
  select?: Prisma.BlogSelect,
) => {
  return (await prisma.blog.update({
    data,
    where: {
      ...where,
      isDeleted: false,
    },
    select,
  })) as Blog;
};

export const getUniqueBlog = async (
  where: Prisma.BlogWhereUniqueInput,
  select?: Prisma.BlogSelect,
) => {
  return (await prisma.blog.findUnique({
    where: {
      ...where,
      isDeleted: false,
    },
    select,
  })) as Blog;
};

export const getAllBlog = async (
  search?: string,
  page: number = 1,
  pageSize: number = 999999999999999,
  where?: Prisma.BlogWhereInput,
  select?: Prisma.BlogSelect,
  orderBy: Prisma.SortOrder = 'desc',
) => {
  const skip = (page - 1) * pageSize;

  const [data, total] = await Promise.all([
    prisma.blog.findMany({
      where: {
        ...where,
        isDeleted: false,
        title: {
          contains: search,
          mode: 'insensitive', // Optional: case-insensitive search
        },
      },
      skip,
      take: pageSize,
      select,
      orderBy: {
        createdAt: orderBy,
      },
    }),
    prisma.blog.count({
      where: {
        ...where,
        title: {
          contains: search,
          mode: 'insensitive', // Ensure the count query matches the findMany query
        },
      },
      orderBy: {
        createdAt: orderBy,
      },
    }),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / pageSize),
  };
};
