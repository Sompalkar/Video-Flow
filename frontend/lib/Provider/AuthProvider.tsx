
"use client";
import axios from 'axios';
import React, { useEffect } from 'react'
import { useAuthStore } from '../store/auth';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const setUser = useAuthStore((state) => state.setUser)

    useEffect(() => {


        const getUser = async () => {
            try {

                const res = await axios.get('http://localhost:8000/api/user/me', {
                    withCredentials: true
                })

                // console.log('from',res.data.user)
                setUser(res.data.user)

            } catch (error) {
                console.log("Persistant login failed", error)
                setUser(null)
            }
        }

        getUser()

    }, [])
    return (
        <div>{children}</div>
    )
}

export default AuthProvider