# Auction Service

## Project Description:
This is a full stack application for a live auction. The purpose of this project was to learn how to code a backend in Node.js.


## Features:
A user can log in using Auth0. Then they are directed to a landing page for the auction. 
A user can create an auction with a name and attach an image of the item.
Then other users of the application can place bids on the items. 
The winner of the auction (highest bidder when auction closes) as well as the seller will recieve an email. 

### Installation:
If you want to run this application on your local device:
Clone this repository.
```
git clone https://github.com/codingly-io/sls-course-frontend
cd frontend
```

Install the NPM dependencies for this project.
```
npm install
```

### Setting up variables
Create a `.env` file in the root folder of this project. You need to specify two variables:

* `REACT_APP_REFRESH_RATE`: The rate at which auctions will be fetched (in milliseconds).

* `REACT_APP_AUCTIONS_ENDPOINT`: Your Auction Service API endpoint.

* `REACT_APP_AUTH0_DOMAIN`: Your Auth0 application domain.

* `REACT_APP_AUTH0_CLIENT_ID`: Your Auth0 application client ID.

For an example, you can take a look at the [.env.example](.env.example) file in this repository.

### Running the application
You can run the application by typing in:
```
npm start
```
The application should now be running at [http://localhost:3000](http://localhost:3000).

## Usage
If you would rather use the website that I have already hosted on Netlify click the link below:

https://melodic-cupcake-16964e.netlify.app
