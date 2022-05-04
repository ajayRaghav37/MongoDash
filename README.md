# MongoDash
This project demonstrates the ability to run MongoDB Atlas Charts visualisations against data held in both your cluster and a Datalake  
**Time to setup: 30 mins**  
**Time to execute: 15 mins**  

# Description
This proof shows how MongoDB can federate queries to multiple data sources in order to build visualizations through Atlas charts. This proof makes use of a financial dataset of 1,000,000 documents representing different kinds of transactions, both fraudulent and legitimate. This data will be federated from both the Atlas cluster and an attached Data Lake.  

Visualtizations will include:
- Transaction count
- Transaction by origin country 
- Overall transaction by month
- Fraud flag confusion matrix  

The 1,000,000 records are retrieved from a publicly available dataset and split between and Atlas cluster and an S3 bucket for datalake. The charts will allow visualizations to be returned against both data sources simultaneously


# Setup
**1. Configure Atlas Cluster**
- Log-on to your Atlas account (using the MongoDB SA preallocated Atlas credits system) and navigate to your SA project
- In the project's Security tab, choose to add a new user called main_user, for this user select Add Default Privileges and in the Default Privileges section add the roles readWriteAnyDatabase and clusterMonitor (make a note of the password you specify)
- Create an M20 based 3 node replica-set in a single AWS region of your choice with default storage settings (backup can be disabled).

**2. Configure Realm Application**


**3. Configure AWS S3 Bucket**
- Using your MongoDB 'Solution Architects' AWS pre-existing account, log on to the AWS console and near the top right hand side of the AWS Console, change the region to match the same AWS region as you created the Atlas cluster in Console
- Navigate to the S3 service within the AWS console and select 'Create bucket'
- Enter a name for the bucket and select the same region as your atlas cluster
- Add Tags: be sure to set the 3 specific tags ('Name', 'owner', 'expire-on') on your instance as per the MongoDB AWS Usage Guidelines to avoid your instance from being prematurely reaped
- All other options can be left as default  
- Load the sample dataset into your S3 bucket

**4. Configure Atlas Data Lake**



# Execution
asdf

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
