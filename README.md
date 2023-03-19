# Effizency Challenge

This is an API that allows to handle articles, creating, listing, searching and updating them, also, get articles according to the author, reading articles from exernal dataset and updates the local database according an external API.

- [Stack](#stack)
- [Installing](#installing)
- [Developing](#developing)
- [Testing](#testing)
- [Building](#building)
- [Executing](#executing)
- [REST API](#rest-api)
  - [Capabilities](#capabilities)
  - [Endpoints](#endpoints)
- [Ends](#ends)

## Stack

- TypeScript
- Express
- Cors
- Class Validator
- Eslit
- Prettier
- PM2
- Jest

## Installing

Installing the packages dependencies

```
npm install
```

## Developing

Throughout the development process you can run the application using `ts-node-dev` which will respawn and compile TypeScript files, so you can execute:

```
npm run start:dev
```

## Testing

Tests are built with Jest, to execute them you can do:

```
npm run test
```

To generate the coverage you can run:

```
npm run test:coverage
```

The coverage result will be place on `test\coverage\index.html` after running the `test:coverage` command

## Building

It's possible to generate a JavaScript build from the compiled TypeScript source code, before that make sure to keep a good code quality so you can use some helpful tools to assure it:

Use `lint:fix` to find possible broke compile rule:

```
npm run lint:fix
```

And `format:fix` to fix the code style

```
npm run format:fix
```

After that you can build the production version:

```
npm run build
```

## Executing

After compiling with `npm run build` you can easily execute the application with node:

```
npm run start:prod
```

Also, it's possible to execute the application with PM2 which is a solutin to make sure the local dataset will be always up to date when fetching data from an external dataset endpoint, so you execute it:

```
npm run pm2:start
```

You can see the pm2 processes using:

```
npm run pm2:list
```

Tracking and monitoring the current API instance:

```
npm run pm2:monit
```

And stop / terminate the current API execution:

```
npm run pm2:stop
```

## REST API

### Capabilities:

<table class="demo">
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Capability</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>GET</strong></td>
      <td>http://localhost:3000/article</td>
      <td>Returns a list of articles</td>
    </tr>
    <tr>
      <td><strong>GET</strong></td>
      <td>http://localhost:3000/article/:id</td>
      <td>Returns an article according to the id</td>
    </tr>
    <tr>
      <td><strong>GET</strong></td>
      <td>http://localhost:3000/article/search</td>
      <td>Returns an article according to the search query params</td>
    </tr>
    <tr>
      <td><strong>POST</strong></td>
      <td>http://localhost:3000/article</td>
      <td>Creates an article</td>
    </tr>
    <tr>
      <td><strong>PUT</strong></td>
      <td>http://localhost:3000/article/:id</td>
      <td>Updates an article according to the id</td>
    </tr>
    <tr>
      <td><strong>GET</strong></td>
      <td>http://localhost:3000/author/:id</td>
      <td>Returns an article according to the author id</td>
    </tr>
    <tr>
      <td><strong>GET</strong></td>
      <td>http://localhost:3000/data/external</td>
      <td>Returns a list of articles from an external resource</td>
    </tr>
    <tr>
      <td><strong>GET</strong></td>
      <td>http://localhost:3000/data/fetch</td>
      <td>Fetchs a list of articles from an external resource and save on current database</td>
    </tr>
  </tbody>
</table>

### Endpoints

**Getting a list of articles**

`GET /article`

```
curl --request GET \
  --url http://localhost:3000/article
```

**Response**

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"title": "New item",
			"intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius.",
			"content": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
			"author_id": 2,
			"created_at": "2023-03-03T11:05:06Z"
		},
        {...}
    ]
}
```

<br />

**Getting an article by id**

`GET /article/:id`

```
curl --request GET \
  --url http://localhost:3000/article/1
```

**Response**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "New item",
    "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius.",
    "content": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    "author_id": 2,
    "created_at": "2023-03-03T11:05:06Z"
  }
}
```

<br />

**Searching and getting an article**

`GET /article/search?title=the&page=1&limit=20&date_from=2023-03-01T10:53:29Z&date_to=2023-03-31T10:53:29Z`

```
curl --request GET \
  --url 'http://localhost:3000/article/search?title=the&page=1&limit=20&date_from=2023-03-01T10%3A53%3A29Z&date_to=2023-03-31T10%3A53%3A29Z'
```

**Query params**

```javascript
{
    page: 1, //number
    limit: 5, //number
    title: 'the', //string
    date_from: '2023-03-01T10:53:29Z', // Date as ISO string
    date_to: '2023-03-31T10:53:29Z', // Date as ISO string

}
```

**Response**

```json
{
	"success": true,
	"data": [
		{
			"id": 2,
			"title": "Merry Jail, The (Das fidele Gefängnis)",
			"intro": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
			"content": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
			"author_id": 5,
			"created_at": "2023-03-18T15:03:16Z"
		},
        {...}
    ]
}
```

<br />

**Creating a new article**

`POST /article`

```
curl --request POST \
  --url http://localhost:3000/article \
  --header 'Content-Type: application/json' \
  --data '{
  "author_id": 99,
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius. Etiam in facilisis tortor, commodo scelerisque nisi. Nullam auctor, nunc ac molestie cursus, tortor mauris fringilla augue, ac pulvinar orci nunc nec orci. Aenean eget quam arcu. Morbi tristique libero ante, non rutrum nisl egestas ac. Suspendisse condimentum dictum metus, nec cursus quam venenatis eu.",
  "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius.",
  "title": "Cool title over here"
}'
```

**Response**

```json
{
  "success": true,
  "data": {
    "id": 102,
    "author_id": 99,
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius. Etiam in facilisis tortor, commodo scelerisque nisi. Nullam auctor, nunc ac molestie cursus, tortor mauris fringilla augue, ac pulvinar orci nunc nec orci. Aenean eget quam arcu. Morbi tristique libero ante, non rutrum nisl egestas ac. Suspendisse condimentum dictum metus, nec cursus quam venenatis eu.",
    "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius.",
    "title": "Cool title over here",
    "created_at": "2023-03-19T15:53:37.149Z"
  }
}
```

<br />

**Updating an article by id**

`PUT /article/:id`

```
curl --request PUT \
  --url http://localhost:3000/article/1 \
  --header 'Content-Type: application/json' \
  --data '{
  "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius.",
  "title": "Cool title over here"
}'
```

**Response**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Cool title over here",
    "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a finibus turpis, sit amet eleifend massa. Mauris quis neque justo. Vestibulum mattis venenatis tellus vel varius.",
    "content": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    "author_id": 2,
    "created_at": "2023-03-03T11:05:06Z"
  }
}
```

<br />

**Getting a list of articles from an external resource**

`GET /data/external`

```
curl --request GET \
  --url http://localhost:3000/data/external
```

**Response**

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"title": "All Together, The",
			"intro": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
			"content": "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
			"author_id": 3,
			"created_at": "2023-03-25T16:51:00Z"
		},
		{...}
    ]
}
```

<br />

**Fetching a list of articles from an external resource and saving on local dataset**

`GET /data/fetch`

```
curl --request GET \
  --url http://localhost:3000/data/fetch
```

**Response**

```json
{
  "success": true
}
```

# Ends

The provided link (http://simple-api.herokuapp.com/api/v1/articles) wasn't available so I took the liberty to create a dataset following the data types according to the challenge description.

I'm using Mockaroo to generate the dataset which you can see here: https://www.mockaroo.com/b9d41960, the same tool provides a mock API based on this dataset, also available here: https://my.api.mockaroo.com/article_database.json?key=69f9a560
