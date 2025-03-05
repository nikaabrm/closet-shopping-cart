# 🛍️ Closet - Modern Shopping Cart Application

<div align="center">
  <p><em>A sleek and modern e-commerce experience built with Angular</em></p>
</div>

## ✨ Features

- 🛒 **Smart Shopping Cart**
  - Real-time cart updates
  - Quantity management
  - Bulk clear cart functionality
  - Price calculations with custom formatting
  
- 💫 **Product Management**
  - Detailed product views
  - Dynamic image galleries
  - Price filtering
  - Category-based navigation
  
- ❤️ **User Experience**
  - Favorites system
  - Toast notifications
  - Responsive design
  - Bootstrap-based UI
  
- 🔐 **Authentication**
  - User login/logout
  - Persistent sessions
  - Secure state management

## 🚀 Tech Stack

- **Framework**: Angular 19
- **State Management**: NgRx
- **UI Components**: 
  - Angular Material
  - Bootstrap 5
  - NGX Toastr
- **Styling**: SCSS
- **Animations**: NGX Owl Carousel
- **Other Libraries**:
  - NGX Slider
  - Angular Router

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/closet-shopping-cart.git
```

2. Install dependencies:
```bash
cd closet-shopping-cart
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── common/
│   │   ├── constants/        # Application constants and enums
│   │   ├── pipes/           # Custom pipes (price, etc.)
│   │   └── services/        # Shared services
│   │
│   ├── shopping-cart/       # Main feature module
│   │   ├── cart/           # Shopping cart component
│   │   ├── categories/     # Category navigation
│   │   ├── favorites/      # Favorites management
│   │   ├── footer/        # Application footer
│   │   ├── header/        # Application header
│   │   ├── highlights/    # Featured products section
│   │   ├── modals/        # Dialog components (login, etc.)
│   │   ├── models/        # Data models and interfaces
│   │   ├── product-detailed/  # Product details view
│   │   ├── product-list-item/ # Individual product card
│   │   ├── products-list/    # Products listing page
│   │   └── spring-collections/ # Seasonal collections
│   │
│   ├── store/              # NgRx state management
│   │   ├── auth/          # Authentication state
│   │   └── cart/          # Shopping cart state
│   │
│   ├── app.component.*     # Root component
│   ├── app.module.ts      # Root module
│   └── app-routing.module.ts # Application routes
│
├── assets/                # Static resources
└── styles/               # Global styles and themes
```

## 🎯 Core Features

### Shopping Cart
- Add/remove items
- Update quantities
- Clear entire cart
- Real-time total calculation
- Persistent cart state

### Product Management
- Category filtering
- Price range filtering
- Detailed product views
- Image galleries
- Order tracking

### User Interface
- Responsive design
- Toast notifications
- Loading states
- Error handling
- Clean animations
