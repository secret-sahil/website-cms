import { PrismaClient, Prisma, Lead } from '@prisma/client';
const prisma = new PrismaClient();

export const createLead = async (
  input: Prisma.LeadUncheckedCreateInput,
  select?: Prisma.LeadSelect,
) => {
  return (await prisma.lead.create({
    data: input,
    select,
  })) as Lead;
};

export const deleteLead = async (where: Prisma.LeadWhereUniqueInput) => {
  return (await prisma.lead.delete({
    where: {
      ...where,
    },
  })) as Lead;
};

export const updateLead = async (
  where: Prisma.LeadWhereUniqueInput,
  data: Prisma.LeadUncheckedUpdateInput,
  select?: Prisma.LeadSelect,
) => {
  return (await prisma.lead.update({
    data,
    where: {
      ...where,
    },
    select,
  })) as Lead;
};

export const getUniqueLead = async (
  where: Prisma.LeadWhereUniqueInput,
  select?: Prisma.LeadSelect,
) => {
  return (await prisma.lead.findUnique({
    where: {
      ...where,
    },
    select,
  })) as Lead;
};

export const getAllLead = async (
  search?: string,
  page: number = 1,
  pageSize: number = 10,
  where?: Prisma.LeadWhereInput,
  select?: Prisma.LeadSelect,
  orderBy: Prisma.SortOrder = 'desc',
) => {
  const skip = (page - 1) * pageSize;

  const [data, total] = await Promise.all([
    prisma.lead.findMany({
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
        createdAt: orderBy,
      },
    }),
    prisma.lead.count({
      where: {
        ...where,
        email: {
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
