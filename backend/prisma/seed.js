import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

async function main() {
  // 1. إنشاء الشركة
  const company = await prisma.company.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Mizan Store',
      name_ar: 'متجر ميزان',
    },
  });
  console.log('✅ الشركة:', company.name_ar);

  // 2. إنشاء الفرع الرئيسي
  const branch = await prisma.branch.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      company_id: company.id,
      name: 'Main Branch',
      name_ar: 'الفرع الرئيسي',
      is_active: true,
    },
  });
  console.log('✅ الفرع:', branch.name_ar);

  // 3. إنشاء مستخدم admin
  const hash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      branch_id: branch.id,
      name: 'المدير العام',
      username: 'admin',
      password_hash: hash,
      role: 'admin',
    },
  });
  console.log('✅ المستخدم:', admin.username);
  console.log('─────────────────────────────');
  console.log('🔑 بيانات الدخول:');
  console.log('   username : admin');
  console.log('   password : admin123');
  console.log('─────────────────────────────');

  // 4. إنشاء العملات الأساسية
  await prisma.currency.upsert({
    where: { id: '00000000-0000-0000-0000-000000000010' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000010',
      code: 'YER',
      name: 'ريال يمني',
      symbol: '﷼',
      exchange_rate: 1,
      is_default: true,
    },
  });

  await prisma.currency.upsert({
    where: { id: '00000000-0000-0000-0000-000000000011' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000011',
      code: 'USD',
      name: 'دولار أمريكي',
      symbol: '$',
      exchange_rate: 1500,
      is_default: false,
    },
  });

  await prisma.currency.upsert({
    where: { id: '00000000-0000-0000-0000-000000000012' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000012',
      code: 'SAR',
      name: 'ريال سعودي',
      symbol: 'SR',
      exchange_rate: 400,
      is_default: false,
    },
  });

  console.log('✅ العملات: YER, USD, SAR');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());