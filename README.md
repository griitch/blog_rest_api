# Express blog REST Api

## Api endpoints

## /posts

### GET /posts

get all posts, public access

### GET /posts/:id

Get a specific post by its id  
public accesss

### POST /posts

Create a new post.  
private access : only users with the property admin = true can create posts.  
The request body is a json document containing the fields : title, text, description, keywords (array)  
All fields except keywords are mandatory

### PUT /posts/:id

Update an existing post  
private access : only users with the property admin = true can update posts  
Same request body format as POST /posts, except not all the fields are mandatory, only the fields
we desire to modify are included

### DELETE /posts/:id

DELETE an existing post  
private access : only users with the property admin = true can delete posts

---

## /comments

### GET /comments/:id

Get all comments of the specified post  
Public access

### POST /comments/:id

Put a comment on the specified post  
Private access : only authentified users can post comments.
Request body format : a json document with the mandatory field "comment"

---

## /users

### POST /users

Create a new user  
Public access  
Request body format : a json document with the fields : username, password

---

## /login

### POST /login

Login and return the jwt if authentified  
Public access  
Request body format : a json document with the fields : username, password

### POST /login/auth

Verify jwt  
Public access  
Request body format : empty body
