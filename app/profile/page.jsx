"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import Profile from "@components/Profile"

const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user?.id}/posts`);
            const data = await response.json()
            setPosts(data)
        }

        if (session?.user?.id) fetchPosts();
    }, [])


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {

    }

    return (
        <Profile
            name="My"
            description="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile