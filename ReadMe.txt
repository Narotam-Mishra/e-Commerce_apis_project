
Github Repo - https://github.com/john-smilga

# morgan - HTTP request logger middleware for node.js

# validator - A library of string validators and sanitizers.



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