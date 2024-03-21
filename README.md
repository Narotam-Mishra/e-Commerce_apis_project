
## [E-Commerce APIs Render URL](https://e-commerce-apis-backend.onrender.com/)

### [APIMATIC Link](https://app.apimatic.io/apientity/export/YXBpbWF0aWNfNjVmYzJkZjVkMzc2NTM5NzRmZjZiOTBi?format=OpenApi3Yaml&exportExtensions=false)

### Setup Basic Express Server
- []import express and assign to variable
- []setup start port variable (7371) and startServer function

### Connect to MongoDB
- []get connection string
- []setup .env with mongo_URI variable and assign the value
- []import 'dotenv' and setup package
- []restart the server

### Basic Routes and Middleware
- [] setup / GET Route
- [] setup express.json() middleware
- [] setup 404 and errorHandler middleware
- [] import 'exress-async-errors' package

### 404 vs ErrorHandler Middleware

### Morgan Pacakge
- [Morgan Package](https://www.npmjs.com/package/morgan)

### User Model
- [] create models folder and userModel.js file
- [] create schema with name,email, password (all type:String)
- [] export mongoose model

### Validator Package
- [MongoDB Validator](https://www.npmjs.com/package/validator)

### Auth Routes Structure

- [] create controllers folder
- [] add authController file
- [] export (register,login,logout) functions
- [] res.send('some string value')
- [] create routes folder
- [] setup authRoutes file
- [] import all controllers
- [] setup three routes
- [] post('/register') post('/login') get('/logout')
- [] import authRoutes as authRouter in the app.js
- [] setup app.use('/api/v1/auth', authRouter)

### Test Routes in Postman

### Register Controller

- [] create user
- [] send response with entire user (only while testing)
- [] check if email already in use (schema and controller)
- [] ignore 'role'
- [] alternative 'admin' setup

### Handle Password

- [] UserSchema.pre('save') - hook
- this points to User
- bcrypt.genSalt - number of rounds
- bcrypt.hash

### JWT

- [] require 'jsonwebtoken' package
- [] create jwt - jwt.sign(payload,secret,options)
- [] verify jwt - jwt.verify(token,secret)
- [] add variables in .env JWT_SECRET=some_secret_value and JWT_LIFETIME=24h
- [] restart the server !!!!
- [] refactor code, create jwt functions in utils
- [] refactor cookie code
- [] setup func attachCookiesToResponse
- [] accept payload(res, tokenUser)
- [] create token, setup cookie
- [] optionally send back the response

### Login Route

- [] check if email and password exist, if one missing return 400
- [] find user, if no user return 401
- [] check password, if does not match return 401
- [] if everything is correct, attach cookie and send back the same response as in register

### Logout Route

- [] set token cookie equal to some string value
- [] set expires:new Date(Date.now())

### User Routes Structure

- [] add userController file
- [] export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
- [] res.send('some string value')
- [] setup userRoutes file
- [] import all controllers
- [] setup just one route - router.route('/').get(getAllUsers);
- [] import userRoutes as userRouter in the app.js
- [] setup app.use('/api/v1/users', userRouter)

### GetAllUsers and GetSingleUser

- [] Get all users where role is 'user' and remove password
- [] Get Single User where id matches id param and remove password
- [] If no user 404

### Authenticate User Setup

### Authorize Permissions Setup
- [] hardcode

### Authorize Permissions Complete
- [] introduce params

### ShowCurrentUser

- [] get user from req
- [] send response with user

### UpdateUserPassword

- [] almost identical to login user
- [] add authenticateUser middleware in the route
- [] check for oldPassword and newPassword in the body
- [] if one missing 400
- [] look for user with req.user.userId
- [] check if oldPassword matches with user.comparePassword
- [] if no match 401
- [] if everything good set user.password equal to newPassword
- [] await user.save()


### createTokenUser in Utils

- [] create a file in utils (createTokenUser)
- [] setup a function that accepts user object and returns userToken object
- [] export as default
- [] setup all the correct imports/exports and refactor existing code

### updateUser with User.findOneAndUpdate()

- [] add authenticateUser middleware in the route
- [] check for name and email in the body
- [] if one is missing, send 400 (optional)
- [] use findOneAndUpdate()
- [] create token user, attachCookiesToResponse and send back the tokenUser

### updateUser with user.save()

### Setup and Apply checkPermissions()

### Tested all User APIs in Postman

### Product Model

- [] create productModel.js in models folder
- [] create Schema
- [] name : {type:String}
- [] price: {type:Number}
- [] description: {type:String}
- [] image: {type:String}
- [] category: {type:String}
- [] company: {type:String}
- [] colors: {type:[]}
- [] featured: {type:Boolean}
- [] freeShipping: {type:Boolean}
- [] inventory:{type:Number}
- [] averageRating:{type:Number}
- [] user
- [] set timestamps
- [] export productModel model

### Product Structure

- [] add productController file in controllers
- [] export (createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage) functions
- [] res.send('function name')
- [] setup productRoutes file in routes
- [] import all controllers
- [] only getAllProducts and getSingleProduct accessible to public
- [] rest only by admin (setup middlewares)
- [] typical setup
- [] router.route('/uploadImage').post(uploadImage)
- [] import productRoutes as productRouter in the app.js
- [] setup app.use('/api/v1/products', productRouter)

### Product Routes in Postman

### Create Product

- [] create user property on req.body and set it equal to userId (req.user)
- [] pass req.body into Product.create
- [] send back the product

### Remaining Controllers (apart from uploadImage)

- [] getAllProducts
- [] getSingleProduct
- [] updateProduct
- [] deleteProduct
- [] typical CRUD, utilize

### Upload Image
- images folder with two images

### Tested all Product APIs including upload product image API in Postman

### Review Model

- [] create reviewModel.js in models folder
- [] create Schema
- [] rating : {type:Number}
- [] title: {type:String}
- [] comment: {type:String}
- [] user
- [] product
- [] set timestamps
- [] export Review model

### Review Structure

- [] add reviewController file in controllers
- [] export (createReview, getAllReviews, getSingleReview, updateReview, deleteReview) functions
- [] res.send('function name')
- [] setup reviewRoutes file in routes
- [] import all controllers
- [] only getAllReviews and getSingleReview accessible to public
- [] rest only to users (setup middleware)
- [] typical REST setup
- [] import reviewRoutes as reviewRouter in the app.js
- [] setup app.use('/api/v1/reviews', reviewRouter)

### Create Review

- [] check for product in the req.body
- [] attach user property (set it equal to req.user.userId) on to req.body
- [] create review
- [] don't test yet

### Get All Reviews and Get Single Review
- [] both public routes, typical setup

### Update Review

- [] get id from req.params
- [] get {rating, title comment} from req.body
- [] check if review exists
- [] if no review, 404
- [] check permissions
- [] set review properties equal to rating, title, comment
- [] use await review.save()
- [] send back 200

### Delete Review

- [] get id from req.params
- [] check if review exists
- [] if no review, 404
- [] check permissions (req.user, review.user)
- [] use await review.deleteOne()
- [] send back 200

### Tested all Review APIs in Postman

### Populate

### Virtuals

### Get Single Product Reviews

### Remove All Reviews

### Aggregation Pipeline - Atlas and Code


### Order Schema

- [] create orderModel.js in models folder
- [] create Schema
- [] tax : {type:Number}
- [] shippingFee: {type:Number}
- [] subtotal: {type:Number}
- [] total: {type:Number}
- [] orderItems:[]
- [] status:{type:String}
- [] user
- [] clientSecret:{type:String}
- [] paymentId:{type:String}
- [] set timestamps
- [] export Order model

### Order Structure

- [] add orderController file in controllers
- [] export (getAllOrders, getSingleOrder, getCurrentUserOrders, createOrder, updateOrder) functions
- [] res.send('function name')
- [] setup orderRoutes file in routes
- [] import all controllers
- [] authenticate user in all routes
- [] getAllOrders admin only
- [] typical REST setup
- [] router.route('/showAllMyOrders').get(getCurrentUserOrders)
- [] import orderRoutes as orderRouter in the app.js
- [] setup app.use('/api/v1/orders', orderRouter)

### Create Order

### Get All Orders and Get Single Order

- [] getAllOrders - admin only
- [] getSingleOrder - chechPermissions


### Get Current User Orders

- [] find orders where user is equal to req.user.userId

### Update Order

- [] get order id
- [] get paymentIntentId (req.body)
- [] get order
- [] if does not exist - 404
- [] check permissions
- [] set paymentIntentId and status as 'paid'
- [] order.save()

### Tested Order APIs in Postman

### Create Docs (Docgen)

- [Docgen Library](https://github.com/thedevsaddam/docgen)
- [] Export Postman Collection
- [] windows_amd64 build -i e-Commerce_APIs.postman_collection.json -o index.html 
- [] create index.html in public
- Note - Make sure the postman's collection and windows_amd64.exe should reside in same folder
- [Docgen guide for Window10](https://sedx876.medium.com/using-docgen-on-windows-to-generate-postman-api-documentation-c4fc1724fef2)

### Security Packages

- [] express-rate-limiter --> to limit request made from each IP address
- [] helmet --> to set security related http response headers.
- [] xss-clean --> to sanitize user input
- [] express-mongo-sanitize --> to protect against MongoDB injection
- [] cors --> to allow access from different domains.

### Deployed on Render
- [Link](https://e-commerce-apis-backend.onrender.com/)
