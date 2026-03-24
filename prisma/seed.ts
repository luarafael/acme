import { PrismaClient, InvoiceStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { userAgent } from 'next/server';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando população de banco de dados...')

  const password = await bcrypt.hash('password', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: password
    }
  })
  console.log (`Usuário criado: ${user.email}`)
  
  const customers_data = [{
    name: 'Luã Rafael',
    email: 'luarvb12@gmail.com',
    imageUrl:'https://ui-avatars.com/api/?name=Luã+Rafael&background=random'
  },
{
  name: 'Clarisse mendes',
  email: 'clarissemendes@gmail.com',
  imageUrl: 'https://ui-avatars.com/api/?name=Clarisse+Mendes&background=random'
}];

const customers = []

for(const data of customers_data) {
  const customer = await prisma.customer.upsert({
    where: { email: data.email},
    update:{},
    create: data
  });

  customers.push(customer);

  console.log(`Cliente criado: ${customer.name}`);
};

const invoices_data = [{
  amount: 150070,
  status: InvoiceStatus.PAGO,
  date: '2026-05-25',
  customer: customers[0]
},

{
   amount: 130070,
  status: InvoiceStatus.PAGO,
  date: '2026-05-02',
  customer: customers[1]
},
{
   amount: 1320070,
  status: InvoiceStatus.PENDENTE,
  date: '2026-05-18',
  customer: customers[2]
},
{
   amount: 112000,
  status: InvoiceStatus.PAGO,
  date: '2026-05-19',
  customer: customers[3]
},
{
   amount: 190070,
  status: InvoiceStatus.PAGO,
  date: '2026-05-17',
  customer: customers[4]
},
{
   amount: 150570,
  status: InvoiceStatus.PAGO,
  date: '2026-05-09',
  customer: customers[5]
},
{
   amount: 1100370,
  status: InvoiceStatus.PAGO,
  date: '2026-05-04',
  customer: customers[6]
},
{
   amount: 200340,
  status: InvoiceStatus.PENDENTE,
  date: '2026-05-13',
  customer: customers[7]
},
{
   amount: 129370,
  status: InvoiceStatus.PAGO,
  date: '2026-05-21',
  customer: customers[8]
},
{
   amount: 173050,
  status: InvoiceStatus.PENDENTE,
  date: '2026-05-22',
  customer: customers[9]
},
{
   amount: 1301070,
  status: InvoiceStatus.PENDENTE,
  date: '2026-05-20',
  customer: customers[10]
},
{
   amount: 130070,
  status: InvoiceStatus.PAGO,
  date: '2026-05-12',
  customer: customers[11]
},

];

for (const invoice of invoices_data){
  await prisma.invoice.create({
    data: {
      amount: invoice.amount,
      status: invoice.status,
      date: new Date(invoice.date),
      customerId: invoice.customer.id
    }
  })
}
console.log ( `${invoices_data.length} faturas criadas.`);

const revenue_data = [{
  month: 'Jan',
  revenue: 908763
},
{
  month: 'fev',
  revenue: 908173
},
 {
  month: 'marc',
  revenue: 908765
},
 {
  month: 'abr',
  revenue: 909265
},
{
  month: 'mai',
  revenue: 908769
},
 {
  month: 'jun',
  revenue: 8287654
},
 {
  month: 'jul',
  revenue: 1008765
},
 {
  month: 'ago',
  revenue: 9087654
},
{
  month: 'set',
  revenue: 9927654
},
 {
  month: 'out',
  revenue: 9237654
},
 {
  month: 'nov',
  revenue: 90876543
},
 {
  month: 'dez',
  revenue: 9087654
},
]
for (const data of revenue_data){
  await prisma.revenue.upsert({
    where: {month: data.month },
    update: { revenue: data.revenue},
    create: data
  })
}

console.log('Dados da receita mensal criados.');

console.log('População concluida com sucesso.');
};

main()
.catch((error) => {
  console.log('Erro ao popular o banco de dados: ', error);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
})

