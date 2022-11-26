import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const authStore = (set: any) => ({
    userProfile: null,
    allUser:[],

    addUser: (user: any) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null }),
    
    fetchAllUser: async () => { 
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);

        set({ allUser: data });
    }
})

const useAuthStore = create(
    persist(authStore, {
        name:'auth'
    })
)

export default useAuthStore;