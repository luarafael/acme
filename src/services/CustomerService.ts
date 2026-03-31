import prisma from "@/lib/prisma";
import {
  Customer,
  CreateCustomerData,
  UpdateCustomerData
} from '@/types';
import { promiseHooks } from "v8";

interface FindAllParams{
  search?: string,
};
 async function findAllCustomer(
  params: FindAllParams = {}): Promise<Customer[]>
{
const { search } = params;

const customers = await prisma.customer.findMany({
  where: search ? {
   OR:[
    { name: {contains: search, mode: 'insensitive'} },
    { email: {contains: search, mode: 'insensitive'} }
   ] 
  }: undefined,
  orderBy: {name:'asc'}
});

return customers;

};

export async function findCustomerById(
  id: string
): Promise<Customer | null>{
  const customer = await prisma.customer.findUnique({
    where: { id }
  })

  return customer
}

export async function createCustomer (
  data: CreateCustomerData
): Promise<Customer> {

  const customer = await prisma.customer.create({
    data
  })

  return customer;
}


export async function updateCustomer (
  data: UpdateCustomerData,
  id: string
): Promise<Customer> {

  const customer = await prisma.customer.update({
    where: { id },
    data
  })

  return customer;
}

export async function deleteCustomer (
  id: string
): Promise<void> {

   await prisma.customer.delete({
    where: { id },
  });
};
