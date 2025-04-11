export const API_URL = {
    EXTERNAL: process.env.NEXT_PUBLIC_API_URL,
    INTERNAL: process.env.NEXT_PUBLIC_API_URL,
}
export const ENDPOINT = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        VERIFY: '/api/auth/verify',
        USER: '/api/auth/user'
    },

    USERMANAGER: {
        USERS: '/api/userManager/users',
        USER: '/api/userManager/user'
    },
    DEPARTMENT: '/api/department',
    STUDENT: '/api/students'

}

export const INTERNAL_ENDPOINTS = {
    AUTH: {
        VERIFY: '/auth/verify',
        USER: '/auth/user',
        SIGNIN: '/auth/signin',
        SIGNUP: '/auth/signup',
    },
    USERS: '/users',
    USER: '/user',
    DEPARTMENT:'/department',
    STUDENT:'/student'
}