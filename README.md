# About
This web application is a single page application of URL Shortener.

## Infrastructure

This applications consists of two parts:
  1. Client: Single Page Application built with: React and MaterialUI.
  2. Server: HTTP REST API built with Node.js, Express and MongoDB.

## Pre-requisites

Nodejs - v14.15.0\
MongoDB Atlas - https://www.mongodb.com/cloud/atlas

## How to run

### Server

Add `.env` file at root with correct mongodb database url

```
DATABASE_URL=mongodb://localhost:27017/url_shortener
	
```

Run following commands at terminal at root of server folder:

`yarn install`\
`yarn start`

once the server app is running you can see this at terminal:

`MongoDB connected`\
`Running server on 5000`

### Client

Next go to `client` folder and run these commands:

`yarn install`\
`yarn start`

once the app is running you can open:\

API: http://localhost:5000/api/status\
UI: http://localhost:3000

on your browser.

