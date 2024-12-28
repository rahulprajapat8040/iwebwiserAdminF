/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
  async redirects() {
    return [
      // Redirect users without the 'admin' cookie away from admin routes
      {
        source: '/admin/:path*',
        missing: [
          {
            type: 'cookie',
            key: 'admin',
          },
        ],
        permanent: false,
        destination: '/', // Redirect to home page if no admin cookie
      },
      // Redirect users with the 'admin' cookie to the dashboard when visiting '/'
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'admin',
          },
        ],
        permanent: false,
        destination: '/admin/dashboard', // Redirect to admin dashboard
      },
    ];
  },
};

export default nextConfig;
