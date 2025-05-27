import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import config from 'config';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    create: {
      firstName: config.get<string>('appName'),
      lastName: '',
      username: 'admin',
      role: 'admin',
      password: await bcrypt.hash('Admin@!23', 12),
    },
    update: {
      firstName: config.get<string>('appName'),
      lastName: '',
      username: 'admin',
      role: 'admin',
      password: await bcrypt.hash('Admin@!23', 12),
    },
    where: {
      username: 'admin',
    },
  });
  await prisma.user.upsert({
    create: {
      firstName: 'Ajay',
      lastName: 'Suri',
      username: 'ajaysuri',
      role: 'content',
      password: await bcrypt.hash('Ajay@123', 12),
    },
    update: {
      firstName: 'Ajay',
      lastName: 'Suri',
      username: 'ajaysuri',
      role: 'content',
      password: await bcrypt.hash('Ajay@123', 12),
    },
    where: {
      username: 'ajaysuri',
    },
  });
  await prisma.office.upsert({
    create: {
      id: '8db7612e-3d7f-482d-b094-7c2568628b24',
      name: 'Head Office',
      address: 'E-314, 4th floor, Sector-75',
      city: 'Mohali',
      state: 'Punjab',
      country: 'India',
      postalCode: '160055',
    },
    update: {
      id: '8db7612e-3d7f-482d-b094-7c2568628b24',
      name: 'Head Office',
      address: 'E-314, 4th floor, Sector-75',
      city: 'Mohali',
      state: 'Punjab',
      country: 'India',
      postalCode: '160055',
    },
    where: {
      id: '8db7612e-3d7f-482d-b094-7c2568628b24',
    },
  });
}
main()
  .then(() => console.log('Seeding complete'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
