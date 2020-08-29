# LLAMA

> Nuxt.js project

## Demo

- Demo: [https://llama-p.vercel.app/](https://llama-p.vercel.app/)

## Logic

- Link to schema: [https://miro.com/app/board/o9J_kncr6hU=/](https://miro.com/app/board/o9J_kncr6hU=/)

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## App setup

### Environment variables

- You can assign environment variables with `.env.development` and `.env.production` files:

  ```
  NODE_ENV=development
  NUXT_ENV_HOST=http://localhost:3000
  FIREBASE_CONFIG={"apiKey":"<apiKey>","authDomain":"<authDomain>","databaseURL":"<databaseURL>","projectId":"<projectId>","storageBucket":"<storageBucket>","messagingSenderId":"<messagingSenderId>","appId":"<appId>"}
  ```
  
## Firebase setup

### Firebase Authentication setup

- Enable "Email/Password" provider.

### Firebase Cloud Firestore setup

- Add composite indexes:

  ```
  Collection ID | Fields indexed                           | Query scope
  --------------|------------------------------------------|------------
  teams         | usersIds Arrays     createdAt Ascending  | Collection
  posts         | teamId   Ascending  createdAt Descending | Collection
  profiles      | teamsIds Arrays     createdAt Descending | Collection
  posts         | userId   Ascending  createdAt Descending | Collection
  ```

- Add rules:

  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if request.auth != null;
      }
      match /invites/{inviteId} {
        allow read: if true;
        allow write: if request.auth != null;
      }
    }
  }
  ```

### Firebase Storage setup

- Add rules:

  ```
  rules_version = '2';
  service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read, write: if request.auth != null;
      }
    }
  }
  ```

## Deployment

- This app can be deployed to Vercel.

  Demo: [https://llama-p.vercel.app/](https://llama-p.vercel.app/)
