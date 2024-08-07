API Routes

 Base URL
`/api`

---

 Authentication API

 1. Login
- Endpoint: `POST /auth/login`
- Description: Authenticates a user and returns a JWT token.
- Request Body:
  ```json
  {
      "email": "user@example.com",
      "password": "your_password"
  }
  ```
- Response:
    - Status: 200 OK
    - Body:
      ```json
      {
          "token": "your_jwt_token"
      }
      ```
- Error Responses:
    - Status: 401 Unauthorized
    - Body:
      ```json
      {
          "message": "Invalid email or password"
      }
      ```

 2. Register
- Endpoint: `POST /auth/register`
- Description: Registers a new user.
- Request Body:
  ```json
  {
      "username": "new_user",
      "email": "new_user@example.com",
      "password": "your_password",
      "dateOfBirth": "YYYY-MM-DD",
      "firstName": "First",
      "lastName": "Last",
      "phoneNumber": "123-456-7890"
  }
  ```
- Response:
    - Status: 201 Created
    - Body:
      ```json
      {
          "id": 1,
          "username": "new_user",
          "email": "new_user@example.com",
          "dateOfBirth": "YYYY-MM-DD",
          "firstName": "First",
          "lastName": "Last",
          "phoneNumber": "123-456-7890"
      }
      ```
- Error Responses:
    - Status: 400 Bad Request
    - Body:
      ```json
      {
          "message": "User already exists"
      }
      ```

---

 Additional Endpoints (if any)

 Example Entity (e.g., Menu)

1. Get All Items
    - Endpoint: `GET /menu/items`
    - Description: Retrieves all menu items.
    - Response:
        - Status: 200 OK
        - Body:
          ```json
          [
              {
                  "id": 1,
                  "name": "Pizza",
                  "price": 9.99
              },
              ...
          ]
          ```

2. Get Item by ID
    - Endpoint: `GET /menu/items/{id}`
    - Description: Retrieves a specific menu item by ID.
    - Response:
        - Status: 200 OK
        - Body:
          ```json
          {
              "id": 1,
              "name": "Pizza",
              "price": 9.99
          }
          ```

3. Create Item
    - Endpoint: `POST /menu/items`
    - Description: Creates a new menu item.
    - Request Body:
      ```json
      {
          "name": "Burger",
          "price": 5.99
      }
      ```
    - Response:
        - Status: 201 Created
        - Body:
          ```json
          {
              "id": 2,
              "name": "Burger",
              "price": 5.99
          }
          ```

4. Update Item
    - Endpoint: `PUT /menu/items/{id}`
    - Description: Updates an existing menu item.
    - Request Body:
      ```json
      {
          "name": "Updated Burger",
          "price": 6.99
      }
      ```
    - Response:
        - Status: 200 OK
        - Body:
          ```json
          {
              "id": 2,
              "name": "Updated Burger",
              "price": 6.99
          }
          ```

5. Delete Item
    - Endpoint: `DELETE /menu/items/{id}`
    - Description: Deletes a specific menu item.
    - Response:
        - Status: 204 No Content
```

Notes
- This file includes example routes for an authentication API and a hypothetical menu entity.
- Modify the example entity routes as per your actual requirements.
- Save this content in a file named `api_routes.md` in your project documentation folder.
