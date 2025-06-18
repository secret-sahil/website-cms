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
      password: await bcrypt.hash('Admin@123', 12),
    },
    update: {
      firstName: config.get<string>('appName'),
      lastName: '',
      username: 'admin',
      role: 'admin',
      password: await bcrypt.hash('Admin@123', 12),
    },
    where: {
      username: 'admin',
    },
  });
  await prisma.office.upsert({
    create: {
      id: '8db7612e-3d7f-482d-b094-7c2568628b24',
      name: 'Head Office',
      address: '2457, Sector-71',
      city: 'Mohali',
      state: 'Punjab',
      country: 'India',
      postalCode: '160071',
    },
    update: {
      id: '8db7612e-3d7f-482d-b094-7c2568628b24',
      name: 'Head Office',
      address: '2457, Sector-71',
      city: 'Mohali',
      state: 'Punjab',
      country: 'India',
      postalCode: '160071',
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
