import { PrismaClient, Prisma, Media } from '@prisma/client';

const prisma = new PrismaClient();

export const createMedia = async (
  input: Prisma.MediaUncheckedCreateInput,
  select?: Prisma.MediaSelect,
) => {
  return (await prisma.media.create({
    data: input,
    select,
  })) as Media;
};

export const deleteMedia = async (where: Prisma.MediaWhereUniqueInput) => {
  return (await prisma.media.delete({
    where,
  })) as Media;
};

export const updateMedia = async (
  where: Prisma.MediaWhereUniqueInput,
  data: Prisma.MediaUncheckedUpdateInput,
  select?: Prisma.MediaSelect,
) => {
  return (await prisma.media.update({
    data,
    where,
    select,
  })) as Media;
};

export const getUniqueMedia = async (
  where: Prisma.MediaWhereUniqueInput,
  select?: Prisma.MediaSelect,
) => {
  return (await prisma.media.findUnique({
    where,
    select,
  })) as Media;
};

export const getAllMedia = async (
  page: number = 1,
  pageSize: number = 999999999999999,
  where?: Prisma.MediaWhereInput,
  include?: Prisma.MediaInclude,
) => {
  const skip = (page - 1) * pageSize;

  const [data, total] = await Promise.all([
    prisma.media.findMany({
      where: where,
      skip,
      take: pageSize,
      include,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.media.count({
      where: where,
      orderBy: {
        createdAt: 'desc',
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
