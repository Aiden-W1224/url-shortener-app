/* eslint-disable react/no-unescaped-entities */
"use client"
import SwaggerDocs from "@/app/components/SwaggerUI";


const Documentation = () => {
    return (
        <div className="p-6 relative overflow-auto max-h-[500px]">
            <div className="mb-8">
            <h2 className="font-bold text-lg">User Registration and Authentication Documentation</h2>
                <div>
                    <li>
                        User registration happens through a POST request. It utilizes the zod library for input validation, 
                        checking for the existence of unique email and username in the database, and employs bcrypt for 
                        password hashing. If duplicate email or username is found, it returns a conflict response. Otherwise, 
                        it hashes the password and creates a new user in the database. The script responds with the user's information 
                        (excluding the password) and a success message if the registration is successful. In case of errors, it provides 
                        a generic error message. Overall, the script follows best practices for secure user registration and effective error handling.
                    </li>
                    <li>
                        User authentication happens by leveraging the credentials provider for email/password authentication. It interacts
                        with Prisma for session storage. There is a secret provided so that NextAuth can sign and encrypt tokens. The authorize function ensures secure user verification by validating provided credentials 
                        against the database, utilizing bcrypt for password comparison. The configuration extends its functionality through callback 
                        functions: jwt customizes the JSON Web Token generation, including an "admin" property if applicable, while the session callback 
                        enhances the user session object with "username" and "admin" properties. 
                    </li>
                    <li>
                        Admin users are determined during the sign-up process. They are able to check a box which sets the admin field in the database, which
                        will toggle analytic viewing privileges.
                    </li>
                </div>
                <SwaggerDocs />
                <h2 className="font-bold text-lg">Database Schema Documentation</h2>
                <h2 className="font-bold">Tables:</h2>

                <div className="ml-4">
                <h3 className="font-bold">User Table:</h3>
                <div className="ml-8">
                    <p className="font-bold">Columns:</p>
                    <ul className="list-disc ml-8">
                    <li>id: Integer, Primary Key, Auto-incremented.</li>
                    <li>email: String, Unique.</li>
                    <li>username: String, Unique (nullable).</li>
                    <li>password: String.</li>
                    <li>admin: Boolean, Default value set to false.</li>
                    </ul>
                </div>
                </div>

                <div className="ml-4">
                <h3 className="font-bold">Url Table:</h3>
                <div className="ml-8">
                    <p className="font-bold">Columns:</p>
                    <ul className="list-disc ml-8">
                    <li>id: String, Primary Key, Default value generated using UUID.</li>
                    <li>longUrl: String.</li>
                    <li>shortUrl: String.</li>
                    <li>urlCode: String, Unique.</li>
                    <li>createdAt: DateTime, Default value set to the current timestamp.</li>
                    <li>updatedAt: DateTime, Updated automatically.</li>
                    </ul>

                    <p className="font-bold">Relationships:</p>
                    <ul className="list-disc ml-8">
                    <li className="ml-4">
                        One-to-Many relationship between the Url and Analytics tables.
                        <ul className="list-disc ml-8">
                        <li>Each Url can have multiple associated Analytics records.</li>
                        <li>The relationship is established using the url_id field in the Analytics table, which references the id field in the Url table.</li>
                        </ul>
                    </li>
                    </ul>
                </div>
                </div>

                <div className="ml-4">
                <h3 className="font-bold">Analytics Table:</h3>
                <div className="ml-8">
                    <p className="font-bold">Columns:</p>
                    <ul className="list-disc ml-8">
                    <li>id: String, Primary Key, Default value generated using UUID.</li>
                    <li>url_id: String, Unique.</li>
                    <li>clicked: Integer.</li>
                    <li>createdAt: DateTime, Default value set to the current timestamp.</li>
                    </ul>

                    <p className="font-bold">Relationships:</p>
                    <ul className="list-disc ml-8">
                    <li>The Analytics table has a foreign key relationship with the Url table through the url_id field.</li>
                    </ul>
                </div>
                </div>
            </div>

            <p className="font-bold">
                In summary, the database schema consists of three tables: User, Url, and Analytics. Each table has specific 
                columns, and there is a one-to-many relationship between the Url and Analytics tables. The User table is independent 
                and not directly related to the other tables in the provided schema.
            </p>
            <div>
                <h3 className="font-bold">Set Up Instructions</h3>
                <div className="ml-8">
                    <p className="font-bold">Columns:</p>
                    <ul className="list-disc ml-8">
                    <li>id: Integer, Primary Key, Auto-incremented.</li>
                    <li>email: String, Unique.</li>
                    <li>username: String, Unique (nullable).</li>
                    <li>password: String.</li>
                    <li>admin: Boolean, Default value set to false.</li>
                    </ul>
                </div>
            </div>
        </div>
      );
    };

export default Documentation;