"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUsersStore } from './store/Users'

import Create from './components/Create'
import Card from './components/Card'
import Loading from './loading'

export default function Home() {


  const searchParams = useSearchParams()
  const { users, setUsers } = useUsersStore();
  const [delay, setdelay] = useState(false);

  useEffect(() => {

    async function fetchUsers() {
      const timeout = setTimeout(() => {
        setdelay("delayed")
      }, 1000);

      await fetch('http://localhost:3000/api/users')
        .then(res => res.json())
        .then(json => {
          const { users } = json;
          setUsers(users)
          console.log('route : /home')
        }).catch(e => console.log(e))
        .finally(() => {
          clearTimeout(timeout)
          setdelay(false)
        })
    }

    fetchUsers();

  }, [searchParams])

  return (
    <>
      <Create />

      {delay === "delayed" && (
        <div className='fixed start-0 bottom-0 w-full p-5 bg-blue-200 animate-bounce'>
          Taking longer than usual!
        </div>

      )}
      <div className="grid grid-cols-1 divide-y my-5">

        {users.length > 0 ? users.map((user) => (
          < Card key={user.id} user={user} />
        )) : (
          <div className="flex justify-center">

            <Loading />
          </div>
        )}
      </div>

    </>
  )
}
