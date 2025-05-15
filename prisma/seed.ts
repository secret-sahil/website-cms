import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    create: {
      firstName: 'Sahil',
      lastName: 'Kumar',
      username: 'sahilkumar',
      role: 'admin',
      password: await bcrypt.hash('Infutrix@!23', 12),
    },
    update: {
      firstName: 'Sahil',
      lastName: 'Kumar',
      username: 'sahilkumar',
      role: 'admin',
      password: await bcrypt.hash('Infutrix@!23', 12),
    },
    where: {
      username: 'sahilkumar',
    },
  });
  await prisma.office.upsert({
    create: {
      name: 'Head Office',
      address: 'E-314, 4th floor, Sector-75',
      city: 'Mohali',
      state: 'Punjab',
      country: 'India',
      postalCode: '160055',
    },
    update: {
      name: 'Head Office',
      address: 'E-314, 4th floor, Sector-75',
      city: 'Mohali',
      state: 'Punjab',
      country: 'India',
      postalCode: '160055',
    },
    where: {
      name_city: {
        name: 'Head Office',
        city: 'Mohali',
      },
    },
  });
}
main()
  .then(() => console.log('Seeding complete'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
