// pages/_middleware.ts or pages/_middleware.js
export {default} from "next-auth/middleware"

export const config = {
    matcher: [
        '/profile/:path*' // Protect the /profile route and all its subroutes
    ],
};
