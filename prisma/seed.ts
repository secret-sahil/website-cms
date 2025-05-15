import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      firstName: 'Sahil',
      lastName: 'Kumar',
      username: 'sahilkumar',
      password: await bcrypt.hash('Sahil@123', 12),
    },
  });
}
main()
  .then(() => console.log('Seeding complete'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
