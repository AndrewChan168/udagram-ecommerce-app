# udagram-ecommerce-app
It is my capstone project of Udacity Cloud Developer Nanodegree Program. It is simulating the CMS part of an e-commerce platform in which everyone could create his/her own brand(s) and sell their products in this e-commerce platform.

This CMS part is divided into two parts:
- Backend: All the code is in folder `udagram-ecommerce-app-backend`
- Frontend: All the code is in folder `udagram-ecommerce-app-crm`

## Start up the application
The backend part is a serverless application which is hosted on AWS. That means you don't have to start up any back-end application.

However, the front end code is not uploaded to AWS. Please download the front end code and follow below steps to start up the front end part (Sorry for my lazy).

### Step-1
In the root directory of this project, type into below code
```
cd udagram-ecommerce-app-crm
```

### Step-2 
Install required packages by typing in below code
```
npm install
```

### Step-3
After install all required packages, type in below code to start the React front-end.
```
npm run start
```

## User story of the application
Please imagine you are going to create a brand on this platform. You first click on `Log In with OAuth` button to login with OAuth server. Then you go to `Profile` page and click on `Register as Admin` button. After that, you go to `Brands` page and click on `Create your new brand` button. Finally, you go to `Products` page.

## Backend part 
The backend part is a serverless application which is hosted on AWS. Data of the application is stored in DynamoDB and file uploaded from client is stored in S3 bucket.

All the code is in folder `udagram-ecommerce-app-backend`.

