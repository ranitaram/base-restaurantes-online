export const revalidate = 0;

import { getPaginatedUsers } from '@/actions';
// https://tailwindcomponents.com/component/hoverable-table

import { Pagination, Title } from '@/components';
import { redirect } from 'next/navigation';
import { UsersTable } from './UsersTable';



export default async function OrdersPage() {

  const {ok, users = []} = await getPaginatedUsers();

  if(!ok){
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
       <UsersTable users={users}/>
       <Pagination totalPages={3}/>
      </div>
    </>
  );
}