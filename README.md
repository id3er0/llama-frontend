# LLAMA

> Nuxt.js project

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

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Logic

- Link to schema: [https://miro.com/app/board/o9J_kncr6hU=/](https://miro.com/app/board/o9J_kncr6hU=/)

## Firebase setup

### Authentication

- Enable "Email/Password" provider.

### Cloud Firestore

- Add composite indexes:

```
Collection ID | Fields indexed                          | Query scope
--------------|-----------------------------------------|------------
teams         | usersIds Arrays createdAt Ascending     | Collection
posts         | teamId   Ascending createdAt Descending | Collection
profiles      | teamsIds Arrays createdAt Descending    | Collection
posts         | userId   Ascending createdAt Descending | Collection
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

### Storage

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
