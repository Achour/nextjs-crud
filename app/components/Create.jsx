"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUsersStore } from '../store/Users';

export default function Create() {

    const router = useRouter();

    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [error, seterror] = useState()

    const [loading, setloading] = useState(false);

    const { addUser } = useUsersStore();

    async function handleSubmit(e) {
        e.preventDefault()

        setloading(true)
        const data = {

            'firstname': firstname,
            'lastname': lastname,
            'email': email
        }

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        }).then(res => res.json())
            .then(json => {
                console.log(json)
                setloading(false)
                if (json.error) {
                    seterror(json.error)
                }
                if (json.code == "created") {
                    addUser(json.data)
                    seterror(false)
                    setemail('')
                    setfirstname('')
                    setlastname('')
                    alert("Created!")
                    router.push(`?created=${json.data.id}`, { scroll: false })
                }
            })


    }
    return (
        <>
            <h1 className='text-3xl'>Create a new user</h1>
            {error && (
                <div className='bg-red-100 p-4 rounded-lg my-2'>

                    <h1 className='text-red-700 capitalize'>{error}</h1>
                </div>
            )}
            <div className='bg-slate-100 p-5 rounded-xl'>
                <form onSubmit={(e) => handleSubmit(e)} >
                    <div className='flex flex-row gap-5 items-center'>

                        <input
                            value={firstname}
                            onChange={(e) => setfirstname(e.target.value)}
                            placeholder='Firstname' type="text" className="px-5 py-2 border rounded-xl" />

                        <input
                            value={lastname}
                            onChange={(e) => setlastname(e.target.value)}
                            placeholder='Lastname' type="text" className="px-5 py-2 border rounded-xl" />

                        <input
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder='Email' type="text" className="px-5 py-2 border rounded-xl" />

                        <button disabled={loading} type="submit" className='px-5 py-2 border rounded-xl bg-slate-950 text-slate-100'>
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}
