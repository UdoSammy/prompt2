"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

function MyProfile() {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      // console.log(data)
      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`);
  }
  async function handleDelete(post) {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to your personamized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default MyProfile;
