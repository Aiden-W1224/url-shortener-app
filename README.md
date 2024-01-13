URL Shortener Web Application

Summary:

This is a web app made with Next.js, PostgreSQL, Prisma, and Supabase. It supports user registration and sign-in. It authenticates using NextAuth, which integrates seamlessly with PostgreSQL. Users can sign-up with admin privileges which allows them to gain access to admin-only analytics. Once signed in, users are brought to a landing page where they can enter a URL to be shortened. 

As an admin, you will be able to view special analytics on the page where the shortened URL is displayed like clicked count and device type.

There is a separate page with documentation which goes into more detail about things like: user registration and authentication, endpoints and the database schema.

Instructions:

1. git clone https://github.com/Aiden-W1224/url-shortener-app.git
2. cd into the directory the project is cloned in
3. npm install && npm run dev