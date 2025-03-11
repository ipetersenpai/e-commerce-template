# 🛒 E-Commerce Database Schema

## 📊 Users Table
| Field         | Type      | Description                                |
|--------------|-----------|--------------------------------------------|
| `userId`     | string    | Unique identifier for each user (Document ID) |
| `name`       | string    | User's full name                           |
| `email`      | string    | User's email address (unique)              |
| `phoneNumber` | string    | (Optional) User's phone number             |
| `address`    | string    | (Optional) User's delivery address         |
| `orders`     | array     | List of order references                   |
| `cart`       | array     | List of product references in the cart     |

---

## 📦 Products Table
| Field           | Type      | Description                                |
|---------------|-----------|--------------------------------------------|
| `productId`   | string    | Unique identifier for each product (Document ID) |
| `name`        | string    | Product name                               |
| `description` | string    | Product description                        |
| `price`       | number    | Price of the product                       |
| `category`    | string    | Product category (e.g., clothes, shoes)    |
| `images`      | array     | List of image URLs                         |
| `stock`       | number    | Available product stock                    |
| `createdAt`   | timestamp | Date product was added                     |
| `averageRating` | number  | Average rating (updated dynamically)       |
| `totalReviews` | number   | Total number of reviews                    |

---

## ⭐ Product Reviews Table (Subcollection of Products)
| Field       | Type      | Description                                |
|------------|-----------|--------------------------------------------|
| `reviewId` | string    | Unique identifier for each review (Document ID) |
| `userId`   | string    | Reference to the user who left the review  |
| `rating`   | number    | Rating value (1-5 scale)                   |
| `comment`  | string    | User's review comment                      |
| `createdAt` | timestamp | Timestamp when the review was created      |

---

## 📄 Orders Table
| Field         | Type      | Description                                |
|--------------|-----------|--------------------------------------------|
| `orderId`    | string    | Unique identifier for each order (Document ID) |
| `userId`     | string    | Reference to the user who placed the order |
| `items`      | array     | List of ordered products and quantities    |
| `totalAmount` | number   | Total cost of the order                    |
| `status`     | string    | Order status (pending, to deliver, delivered) |
| `createdAt`  | timestamp | Timestamp when the order was placed        |
| `deliveryDate` | timestamp | (Optional) Expected delivery date          |

---

## 🗂️ Categories Table
| Field        | Type      | Description                                |
|-------------|-----------|--------------------------------------------|
| `categoryId` | string    | Unique identifier for each category (Document ID) |
| `name`       | string    | Category name (e.g., clothes, perfume)     |
| `description` | string    | (Optional) Category description            |

---

## 🛒 Carts Table
| Field      | Type      | Description                                |
|-----------|-----------|--------------------------------------------|
| `cartId`  | string    | Unique identifier for each cart (Document ID) |
| `userId`  | string    | Reference to the user who owns the cart    |
| `items`   | array     | List of product references and quantities  |
| `totalPrice` | number | Total price of items in the cart           |
| `updatedAt` | timestamp | Last updated timestamp                     |

---

