# Self Courier - Frontend

## Navbar - version 1

This version implements the **Navbar** for the **Self Courier** project.

### 🚀 Implemented Features

- **Logo & Branding:** Displays the company logo and name.
- **Navigation Links:** Home, Services, Earn With Us, Help, Language Selection.
- **Dropdown Menus:**
  - **Services:** Parcel Delivery, Same-Day Delivery.
  - **Earn With Us:** Delivery options for Bike, Truck, and Van.
  - **Language Selector:** English and Bangla.
- **Hover-based Dropdowns:** Menus appear when hovering over the respective items.
- **Auto-Close on Mouse Leave:** Dropdowns close when the cursor moves away.
- **Authentication Buttons:** "Login" and "Register" buttons.

### 📌 Navbar Preview 
 
Here is a screenshot of the implemented navbar: 
![alt text](image.png)


### Bugs
The `@apply` directive in Tailwind CSS is still not functioning properly.


## Log In page

### Overview
This is a login form. It uses **react-hook-form** for form handling, validation, and submission.

### Features
✅ Email & Password Input Fields  
✅ Terms and Conditions Checkbox  
✅ Real-time Validation with Error Messages  
✅ Background Image on Right Side  
✅ Logo & Brand Name on Top  

### 📌 Usage
This login form requires users to enter their email, password, and agree to the terms & conditions before submitting.

### 📌 Input Fields & Validation

```ts
type InputFormSignIn = {
  gmail: string;
  password: string;
  termAndCondition: boolean;
};

```

### 📌 Log In Preview 
 
Here is a screenshot of the implemented Log In: 
![alt text](image-1.png)