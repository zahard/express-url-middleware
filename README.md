# template-url-middleware
Middleware for *Express* framework that provides current request URL as property to render engine. So it can be accessed in any template without passing it in each `response.render()` call

## Example
Lets assume we have `app.js` file with application and a `view` directory with file `home.ejs` (or you can use any other template engine)
 
```js
// app.js 
const express = require('express');
const urlMiddleware = require('template-url-middleware');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// Prodive current path to all templates globally
// Provided string will be used as name of template property (default is 'path')
app.use(urlMiddleware('path'));
app.use('/home', (res, res) => {
  res.render('home', {
    myProperty: 'Hello'
  });
});
app.listen();
```
After you will be able to refference this `path` property in templates
```html
<!-- Fragment of template views/home.ejs -->
<ol>
  <li><%= path %></li> <!-- will resolve to  '/home' -->
  <li><%= myProperty %></li>
<ol>

```
