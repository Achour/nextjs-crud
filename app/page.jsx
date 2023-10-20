import Image from 'next/image'
import Create from './components/Create'
import Card from './components/Card'


async function fetchUsers() {
  const res = await fetch('http://localhost:3000/api/users', { next: { revalidate: 0 } })
  if (!res.ok) {
    throw new Error("failed to fetch users")
  }

  return res.json()
}

export default async function Home() {

  const users = await fetchUsers()

  return (
    <>

      <Create />
      <div className="grid grid-cols-1 divide-y my-5">
        {users.users.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>

      <h1>Hello world </h1>
    </>
  )
}
