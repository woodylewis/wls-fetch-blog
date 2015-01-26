#wls-fetch-blog

Creates a service to retrieve a list of blog posts from http://woodylewis.com. A php script with CORS headers does a MySQL query on the blog's Drupal CMS database. List is pulled down once, and toggles show/hide.

Using ngClick on each list item, the individual post can be retrieved by appending the Drupal node id to the blog URL. This works because of the CORS headers.

To do: modify use of ngCloak and ngHide to eliminate occasional flicker.

```
bower install angular-bootstrap
```
```
bower install angular-ui-router
```
```
npm install
```
```
npm start
```