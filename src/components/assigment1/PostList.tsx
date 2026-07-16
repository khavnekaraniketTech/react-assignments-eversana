import { useEffect, useState } from 'react';
import { postService } from '../../api/postService';
import type { Post } from '../../types';

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postService.getPosts()
            .then(data => setPosts(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">Fetched Feed Data</h3>
                <p className="text-xs text-gray-400">Assignment 1 Part C: Dynamic asynchronous lifecycle population</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                    <div key={post.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full uppercase">
                                ID: {post.id}
                            </span>
                            <h4 className="font-semibold text-sm text-gray-800 mt-2 line-clamp-1 capitalize">{post.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-3 leading-relaxed">{post.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}