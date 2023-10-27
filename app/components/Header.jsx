"use client"
import React from 'react'
import { useUsersStore } from '../store/Users'
import Link from 'next/link';
export default function Header() {

    const { users } = useUsersStore();

    return (
        <>
            <div className='flex justify-between border-b py-3 mb-3'>
                <ul className='flex flex-row gap-5 '>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/test">Test <small>(BETA)</small></Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/ssr">Ssr</Link></li>
                </ul>
                <ul className='text-blue-600'>
                    <li>
                        Count : {users ? users.length : 'Loading..'}
                    </li>
                </ul>
            </div>
        </>
    )
}
