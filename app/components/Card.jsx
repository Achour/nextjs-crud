"use client"

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

export default function Card({ user }) {


    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [newfirstname, setnewfirstname] = useState(user.firstname)
    const [newlastname, setnewlastname] = useState(user.lastname)
    const [newemail, setnewemail] = useState(user.email)
    const [update, setupdate] = useState(false)

    function handleClick(id) {
        router.push(`?deleted=${id}`, { scroll: false })
        fetch('/api/users', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'id': id })
        }).then(res => res.json())
            .then(json => {
                console.log(json)
                const { error } = json;
                if (error) {
                    alert(error)
                } else {
                    alert(`${json.data.firstname} ${json.data.lastname} deleted!`)

                }
            }).finally(() => {
                //
            })
    }

    async function handleUpdate() {

        const data = {
            'id': user.id,
            'firstname': newfirstname,
            'lastname': newlastname,
            'email': newemail
        }
        fetch('/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        }).then(res => res.json())
            .then(json => {
                if (json.error) {
                    alert(json.error)

                } else {
                    setupdate(false)
                    user.firstname = newfirstname
                    user.lastname = newlastname
                    user.email = newemail
                }
                console.log(json)
            })


    }

    if (id == user.id && update == true) {

        return (
            <div className='grid grid-cols-7 py-3'>
                <div className='col-span-2 capitalize'>
                    <input
                        onChange={(e) => setnewfirstname(e.target.value)}
                        className="px-1 py-1 border rounded-xl" type="text" value={newfirstname} />
                </div>
                <div className='col-span-2 capitalize'>
                    <input
                        onChange={(e) => setnewlastname(e.target.value)}
                        className="px-1 py-1 border rounded-xl" type="text" value={newlastname} />
                </div>
                <div className='col-span-2'>
                    <input
                        onChange={(e) => setnewemail(e.target.value)}
                        className="px-1 py-1 border rounded-xl" type="email" value={newemail} /
                    ></div>
                <div>
                    <button onClick={handleUpdate} className='text-blue-600 me-3'>Save </button>
                </div>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-7 py-3'>
            <div className='col-span-2 capitalize'>{user.firstname}</div>
            <div className='col-span-2 capitalize'>{user.lastname}</div>
            <div className='col-span-2'>{user.email}</div>
            <div>
                <button onClick={() => {
                    setupdate(true)
                    router.push(`?id=${user.id}`, { scroll: false })
                }} className='text-blue-600 me-3'>Update </button>
                <button onClick={() => handleClick(user.id)} className='text-red-600'> Delete</button>
            </div>
        </div>
    )
}
