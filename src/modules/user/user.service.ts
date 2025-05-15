import { PrismaClient, Prisma, User } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (input: Prisma.UserCreateInput, select?: Prisma.UserSelect) => {
  return (await prisma.user.create({
    data: input,
    select,
  })) as User;
};

export const findUser = async (
  where: Partial<Prisma.UserWhereInput>,
  select?: Prisma.UserSelect,
) => {
  return (await prisma.user.findFirst({
    where,
    select,
  })) as User;
};

export const findUniqueUser = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect,
) => {
  return (await prisma.user.findUnique({
    where,
    select,
  })) as User;
};

export const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
  select?: Prisma.UserSelect,
) => {
  if (!where.id) {
    throw new Error('At least one unique identifier (id, phone, or username) must be provided.');
  }
  return (await prisma.user.update({ where, data, select })) as User;
};

export const countUsers = async (where?: Prisma.UserWhereInput) => {
  return prisma.user.count({
    where,
  });
};

export const getAllUsers = async (where?: Prisma.UserWhereInput, select?: Prisma.UserSelect) => {
  return prisma.user.findMany({
    where: {
      ...where,
    },
    select,
  });
};
