import axios from 'axios';
import type { Post } from '../types';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const postService = {

    registerUser: async (payload: any) => {
        return axios.post(`${API_BASE}/users`, payload);
    },


    loginUser: async (payload: any) => {
        return axios.post(`${API_BASE}/posts`, {
            title: 'mock-session-token',
            body: payload.email,
            userId: 1,
        });
    },


    getPosts: async (): Promise<Post[]> => {
        const response = await axios.get<Post[]>(`${API_BASE}/posts?_limit=15`);
        return response.data;
    }
};