import { PrismaClient, Prisma, JobOpening } from '@prisma/client';

const prisma = new PrismaClient();

export const createJobOpening = async (
  input: Prisma.JobOpeningUncheckedCreateInput,
  select?: Prisma.JobOpeningSelect,
) => {
  return (await prisma.jobOpening.create({
    data: input,
    select,
  })) as JobOpening;
};

export const deleteJobOpening = async (where: Prisma.JobOpeningWhereUniqueInput) => {
  return (await prisma.jobOpening.delete({
    where,
  })) as JobOpening;
};

export const updateJobOpening = async (
  where: Prisma.JobOpeningWhereUniqueInput,
  data: Prisma.JobOpeningUncheckedUpdateInput,
  select?: Prisma.JobOpeningSelect,
) => {
  return (await prisma.jobOpening.update({
    data,
    where,
    select,
  })) as JobOpening;
};

export const getUniqueJobOpening = async (
  where: Prisma.JobOpeningWhereUniqueInput,
  select?: Prisma.JobOpeningSelect,
) => {
  return (await prisma.jobOpening.findUnique({
    where,
    select,
  })) as JobOpening;
};

export const getAllJobOpening = async (
  search?: string,
  page: number = 1,
  pageSize: number = 10,
  where?: Prisma.JobOpeningWhereInput,
  include?: Prisma.JobOpeningInclude,
) => {
  const skip = (page - 1) * pageSize;

  const [data, total] = await Promise.all([
    prisma.jobOpening.findMany({
      where: {
        ...where,
        title: {
          contains: search,
          mode: 'insensitive', // Optional: case-insensitive search
        },
      },
      skip,
      take: pageSize,
      include,
    }),
    prisma.jobOpening.count({
      where: {
        ...where,
        title: {
          contains: search,
          mode: 'insensitive', // Ensure the count query matches the findMany query
        },
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
