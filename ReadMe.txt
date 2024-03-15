
# morgan - HTTP request logger middleware for node.js

# validator - A library of string validators and sanitizers.

# access cookie on server using `cookie-parser`.

# signed and secure flags
# Link - https://expressjs.com/en/5x/api.html#res.cookie

# In case of secure flag, it restricts browsers to send cookies only over HTTPS.

# In case of signed flag, cookies will be visible but with signature hence it can detect if the client modified the cookie.

# When we perform testing of our app, we working in HTTP and we use HTTPS when we deploy the app to production 

# More about Cookies 

# When we work with cookies on the frontend, we don't have to do anything. We make a request, we get back the cookie and browser does the rest part.

# When it comes to HTTP only cookies unlike local storage, we can't access them with client side Javascript.

# One downside of the cookie is that there is a max size for the cookie. So, if we are sending bunch of data that's something that need to be aware of and the max size of cookie is 4096 bytes. 

# we can only send cookies back where they came fron (means on same domain) that means we can only use cookies on the same domain. Hence in case of React Application we need to send cookies where the react app is running and part from this we also need to add proxy in package.json file of react-app ("proxy" : "http://localhost:7374")  (port no 3000 or 5137) 

# Signed cookies are alwys present in req.signedCookies property and regular cookies (if we don't sign them) then they will be in the cookies.

# reviews (model) is tied to user and product. user leaves a review on the product

# Note - user can leave only one review per product.

# There are two ways from which we can implement 'only one review per product' feature - 1). using 'indexing' right on schema, 2). in the controllers (review controller) when we create review APIS 

# populate() method MongoDB - this method allows us to reference documents in other collections. By using this method we could get specific info about product, when requesting all reviews.

# In order to connect product collection with review collections, we need to use 'Mongoose virtuals'. We can think of mongoose virtuals as properties that do not persist or are stored in the database, they only exist logically. We used to create them on the fly when we want to compute something. To setup this we will add following in 'productModel'.js file 

# `{ timestamps: true, toJSON:{virtuals: true}, toObject: {virtuals: true} }` - after adding this line, this reviews will be add it as a virtual property

# on virtual properties, we won't be able to perform query.

# difference between model and schema
# In MongoDB, the terms "schema" and "model" are often used in the context of defining the structure of your data, but they serve slightly different purposes:

1. **Schema**:
   - In MongoDB, a schema refers to the structure or blueprint of the documents stored in a collection.
   - While MongoDB is a NoSQL database and is schema-less by nature, it's still common and often recommended to have a clear idea of the structure of your documents.
   - A schema defines the fields (attributes) that each document in a collection can have, along with their data types, validation rules, and sometimes default values or constraints.
   - MongoDB allows for flexible schemas, meaning that documents within a collection do not have to have the same fields, and fields can vary in type and structure from one document to another.
   - Schemas can be enforced at the application level or through MongoDB's validation features, such as schema validation rules or the use of Mongoose schemas (if using Mongoose as an ODM).

2. **Model**:
   - In MongoDB, a model typically refers to the representation of a MongoDB collection in your application code.
   - In the context of Node.js applications, developers often use ODM (Object-Document Mapping) libraries like Mongoose to define models.
   - A model in Mongoose typically consists of a schema (which defines the structure of documents) and additional functionality or methods.
   - Models are used to interact with MongoDB collections from your Node.js application. They provide an abstraction layer that simplifies CRUD operations and allows you to work with MongoDB data in a more object-oriented manner.
   - Models often include methods for querying, creating, updating, and deleting documents, as well as hooks for performing actions before or after certain operations.
   - Models also provide a way to define relationships between different collections (if your data model requires it), such as embedding documents or referencing other documents.

# In summary, while both schema and model relate to the structure and handling of data in MongoDB, a schema defines the structure of documents within a collection, while a model represents a MongoDB collection in your application code and provides functionality for interacting with that collection.

# In Mongoose, the `pre()` method is used to define middleware functions that are executed before certain operations are performed on documents. These middleware functions can be attached to specific document lifecycle events, such as `save`, `validate`, `remove`, and others.

x# Here's what the `pre()` method does:

1. **Specifies a Document Middleware**:
   - The `pre()` method is used to specify a document middleware function that should be executed before a particular document operation occurs.

2. **Hooks into Document Lifecycle Events**:
   - The first argument to `pre()` is the name of the document lifecycle event to hook into. Common events include `save`, `validate`, `remove`, `findOneAndUpdate`, and others.
   - In your example, `pre('save', ...)` indicates that the middleware function should run before a document is saved to the database.

3. **Defines Middleware Function**:
   - The second argument to `pre()` is the middleware function itself.
   - This function will be executed before the specified document operation (in this case, before saving the document).

4. **Async Functionality**:
   - Middleware functions can be asynchronous, allowing you to perform asynchronous tasks like hashing passwords with bcrypt, as shown in your example.
   - In your code snippet, the middleware function generates a salt using `bcrypt.genSalt()` before saving the document.

5. **Access to Document Context**:
   - Inside the middleware function, you have access to the document context (`this`) which represents the document being saved or operated on.
   - This allows you to manipulate the document's data before it's saved or perform additional actions based on the document's properties.

# Overall, `pre()` method in Mongoose Schema is a powerful feature that allows you to add custom logic or perform tasks before specific document operations, enhancing the flexibility and functionality of your MongoDB-backed applications.

# purpose of using `cookie-parser`

# The `cookie-parser` package in Node.js is used to parse HTTP request cookies. When a client sends an HTTP request to a server, it can include cookies in the request headers. These cookies may contain session information, user preferences, authentication tokens, or other data.

# Here are some reasons why developers use the `cookie-parser` package:

1. **Parsing Cookies**: The primary purpose of `cookie-parser` is to parse the cookies sent by clients in HTTP requests. It extracts cookie data from the request headers and makes it accessible to the server-side code.

2. **Simplified Access**: After parsing, the `cookie-parser` package simplifies access to cookie data by providing it as an object or a key-value pair, making it easier for developers to work with cookie data in their applications.

3. **Middleware Function**: `cookie-parser` is often used as a middleware function in Express.js applications. Middleware functions intercept incoming requests before they reach the route handlers, allowing developers to preprocess request data, including cookies, before handling them in the route handlers.

4. **Security**: `cookie-parser` provides options for configuring secure cookies, such as setting the `signed` option to sign the cookies with a secret, which helps prevent tampering and enhances security.

5. **Integration with Session Management**: Many web applications use cookies to manage user sessions. The `cookie-parser` package integrates seamlessly with session management middleware like `express-session`, enabling developers to create and manage user sessions based on cookies.

6. **Consistency**: Using `cookie-parser` ensures consistency and compatibility with various client-side frameworks and libraries that rely on cookies for storing and transmitting data, such as browser-based authentication mechanisms and state management solutions.

# Overall, `cookie-parser` simplifies the process of working with HTTP cookies in Node.js applications, providing developers with a convenient and standardized way to handle cookie data, enhance security, and integrate session management functionality.

# Indexing in MongoDB

# In MongoDB, indexing is a technique used to improve the performance of queries by allowing the database to quickly locate and access specific documents in a collection. An index is a special data structure that stores a subset of the collection's data in an optimized format, making it faster to retrieve data based on the indexed fields.

# Here are some key points about indexing in MongoDB:

1. **Purpose**: Indexes are used to improve query performance by reducing the number of documents that need to be scanned or examined when executing a query. Without indexes, MongoDB would need to perform a collection scan, which can be slow and inefficient, especially for large collections.

2. **Index Structure**: MongoDB supports various types of indexes, including single-field indexes, compound indexes (indexes on multiple fields), multikey indexes (for arrays), geospatial indexes, text indexes, hashed indexes, and more. Each index type is designed to optimize queries based on specific field types or query patterns.

3. **Creation**: Indexes can be created on one or more fields of a collection using the `createIndex()` method or by specifying index keys in the schema when defining a collection using Mongoose (in Node.js). Indexes can also be created in the background to avoid blocking write operations.

4. **Automatic Indexing**: MongoDB automatically creates an index on the `_id` field for every collection, which acts as the primary key. Additionally, some operations, such as creating unique constraints or enforcing unique fields, automatically create indexes behind the scenes.

5. **Query Optimization**: When a query matches an indexed field or fields, MongoDB can use the index to quickly narrow down the search to a subset of documents that satisfy the query conditions. This significantly reduces the time and resources required to fetch the desired data.

6. **Trade-offs**: While indexes improve read/query performance, they come with trade-offs. Indexes consume storage space and require additional processing during write operations (inserts, updates, and deletes). Over-indexing can lead to increased storage requirements and slower write performance.

# In summary, indexing in MongoDB plays a crucial role in optimizing query performance and should be carefully planned based on the application's query patterns, data access patterns, and performance requirements. Efficient indexing strategies can greatly enhance the overall responsiveness and scalability of MongoDB databases.

Q. Is 'unique' is index in mongoDB?

# Yes, in MongoDB, the `unique` constraint is implemented using an index. When you mark a field as `unique` in MongoDB, MongoDB automatically creates a unique index on that field. This unique index enforces the uniqueness constraint and ensures that no two documents in the collection can have the same value for the unique field or combination of fields.

# Behind the scenes, MongoDB maintains a unique index data structure that allows it to quickly check for duplicate values when inserting or updating documents. If a document violates the unique constraint, MongoDB rejects the operation and throws a duplicate key error.

# It's important to note that while the `unique` constraint is enforced by an index, it is distinct from the concept of a primary key in traditional relational databases. In MongoDB, documents do not have a predefined primary key like in SQL databases. Instead, you can choose any field or combination of fields to have the `unique` constraint, and MongoDB will handle the indexing and uniqueness checks accordingly.