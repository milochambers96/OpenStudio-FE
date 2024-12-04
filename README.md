# OpenStudio Frontend Platform

## Overview

OpenStudio is an art marketplace that is built with a focus on eliminating traditional barriers between artists and collectors. The platform bridges the gap between artists and collectors, eliminating traditional gallery commission structures, creating a more equitable art economy. This frontend application, built with React and TypeScript, provides a platform for artists to showcase and sell their work and for collectors to discover and acquire unique pieces directly from creators.

Developed in parallel with its [Django backend counterpart](https://github.com/milochambers96/OpenStudio-BE/), OpenStudio demonstrates the integration of multiple modern technologies to create a secure, user-centric marketplace experience.

The live application can be found at [OpenStudio](https://openstudio.netlify.app/).

## Features

### Core Platform Features

- **Artist Portfolio Management**

  - Complete artwork management system with multiple image upload capability
  - Order processing dashboard for tracking sales and managing inventory
  - Real-time order status notifications

- **Collector Experience**

  - Purchase request system replacing traditional cart functionality
  - Order tracking and status updates
  - Wishlist functionality for saving favourite pieces in a personal gallery

- **UK-Specific Marketplace**

  - Built-in shipping cost calculator using UK postal zones
  - Custom address verification for UK locations
  - Real-time pricing updates including shipping costs
  - Advanced artwork search and filtering
  - Responsive image carousel display

- **Platform Infrastructure**
  - Role-based authentication system (Artist/Collector)
  - Real-time notification system for order updates
  - Comprehensive image management with Cloudinary
  - Type-safe form validation throughout
  - Advanced order processing system

## Technical Overview

### Core Technologies

- React 18.3 with TypeScript
- Vite for build tooling
- React Router for navigation
- Axios for API communication

### State Management & Authentication

- React Hooks for local state
- Context API for auth state
- JWT for secure authentication
- Custom-built role-based access control

### UI & Styling

- Bulma CSS Framework
- Custom CSS Modules
- Responsive design patterns

### Development Tools

- ESLint for code quality
- TypeScript for type safety
- Git for version control

### Key Technical Features

- Custom UK shipping calculator
- Real-time notification system
- Multi-step purchase workflow
- Dynamic role-based UI components
- Cloudinary integration for image management

## Application Architecture

### Component Structure

```typescript
src/
├── components/
│   ├── MemberAccess/        # User access management
│   ├── StudioDisplay/       # Artist features
│   ├── GalleryDisplay/      # Collector features
│   └── Marketplace/         # Shared features
│   └── UtilityComps/        # Reusable form components and utilities
├── interfaces/              # TypeScript definitions
```

### Type System Foundation

```typescript
// Example of type-safe foundation
export interface IMember {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: "artist" | "collector";
  bio?: string;
  website?: string;
  address: string;
  postcode: string;
}
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- NPM or Yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/OpenStudio-FE.git
cd OpenStudio-FE

# Install dependencies
npm install

# Set up environment variables
# Create a .env file in the root directory with:
VITE_APP_API_URL=your_backend_url
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Run the development server
npm run dev
```

### Environment Variables

The application requires the following environment variables:

```bash
VITE_APP_API_URL=       # Your backend API URL
VITE_CLOUDINARY_CLOUD_NAME=    # Cloudinary cloud name for image uploads
VITE_CLOUDINARY_UPLOAD_PRESET= # Cloudinary upload preset
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

# Implementation Details

## Core System Features

### Authentication & User Management

The authentication system implements JWT-based security with role-based access control, managing user sessions and permissions. The system efficiently handles two distinct user types (artists and collectors) with different access levels and capabilities.

```typescript
function App() {
  const [member, setMember] = useState<IMember | null>(null);
  const [isArtist, setIsArtist] = useState(false);
  const [isCollector, setIsCollector] = useState(false);

  async function fetchMember() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/members/user/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMember(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (member?.user_type === "artist") {
      setIsArtist(true);
    } else {
      setIsArtist(false);
    }
  }, [member]);
}
```

### Real-time Updates

The notification system utilises an efficient polling mechanism for order updates with optimised re-render prevention. This provides users with immediate feedback about order status changes and new activities.

```typescript
function NavbarNotification() {
  const [hasUnviewedOrders, setHasUnviewedOrders] = useState(false);

  const checkUnviewedOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.get(`${baseUrl}/orders/unviewed-orders/`);
      setHasUnviewedOrders(response.data.has_unviewed_orders);
    } catch (error) {
      console.error("Error checking unviewed orders:", error);
    }
  }, []);

  useEffect(() => {
    checkUnviewedOrders();
    const interval = setInterval(checkUnviewedOrders, 30000);
    return () => clearInterval(interval);
  }, [checkUnviewedOrders]);
}
```

![Example of small red notification rendering on the navbar everytime an update happens to an order](/openstudio/src/assets/readme-images/Notification.png)

## User Features

### Artist Studio

The artist studio provides a comprehensive workspace for artwork and sales management. Each artist receives a personalised studio space with their name displayed in the possessive form (e.g., "Sarah's Studio").

Key Features:

- Artwork Portfolio Management
- New Artwork Upload Interface
- Order Management System

```typescript
function StudioProfile({ member }: { member: IMember | null }) {
  const [activeTab, setActiveTab] = useState("artworks");
  const studioTitle = member
    ? `${member.first_name} ${getPossessiveForm(member.last_name)} Studio`
    : "Studio";

  return (
    <section className="section mt-5">
      <div className="box mt-5">
        <div className="tabs is-centered">
          <ul>
            <li className={activeTab === "artworks" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("artworks")}>Studio Artworks</a>
            </li>
            <li className={activeTab === "upload" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("upload")}>Upload Artwork</a>
            </li>
            <li className={activeTab === "orders" ? "is-active" : ""}>
              <a onClick={() => setActiveTab("orders")}>Order Manager</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
```

| ![Example of an artist's studio](/openstudio/src/assets/readme-images/Artist-Studio.png) |
| :---------------------------------------------------------------------------: |
|                        _Example of an artist's studio_                        |

### Collector Experience

The collector's gallery provides a personalised space for art enthusiasts to curate their collection and manage their purchases. The system maintains a clean separation between saved artworks and active orders.

Key Features:

- Curated artwork collection
- Purchase history tracking
- Order status monitoring

```typescript
function GalleryArtworks() {
  const [galleryArtworks, setGalleryArtworks] = useState<Artworks>(null);

  async function getArtworks(page: number) {
    try {
      const response = await axios.get(`${baseUrl}/galleries/my-gallery/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { page, per_page: itemsPerPage },
      });
      setGalleryArtworks(response.data.artworks);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching gallery artworks:", error);
    }
  }
}
```

| ![Example of a collector's gallery](/openstudio/src/assets/readme-images/Collectors-Gallery.png) |
| :-----------------------------------------------------------------------------------: |
|                          _Example of a collector's gallery_                           |

## Shared Components

### Form Validation System

Custom validation hooks handle UK-specific address formats and business logic.

```typescript
export const useAddressValidation = (
  address: string,
  postcode: string
): AddressValidationResult => {
  const [validationResult, setValidationResult] = useState({
    isValid: false,
    errors: {
      address: [],
      postcode: [],
    },
  });

  useEffect(() => {
    const validateAddress = () => {
      const addressErrors: string[] = [];
      const postcodeErrors: string[] = [];

      if (!address.trim()) {
        addressErrors.push("Address cannot be empty");
      }
      if (
        !/^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2}$/.test(
          postcode.toUpperCase()
        )
      ) {
        postcodeErrors.push("Invalid UK postcode format");
      }

      setValidationResult({
        isValid: addressErrors.length === 0 && postcodeErrors.length === 0,
        errors: { address: addressErrors, postcode: postcodeErrors },
      });
    };

    validateAddress();
  }, [address, postcode]);

  return validationResult;
};
```

### Image Management

The image carousel component handles multiple image uploads with Cloudinary integration and preview functionality.

```typescript
function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel useKeyboardArrows={true}>
      {images.map((image, index) => (
        <div key={image.id || index} className="slide">
          <img
            src={image.image_url}
            alt={`An image of ${image.artwork.title}`}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.jpg";
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}
```

| ![Example of image carousel](/openstudio/src/assets/readme-images/Image-cara.png) ![Example of image carousel](/openstudio/src/assets/readme-images/Image-cara-2.png) |
| :---------------------------------------------------------------------------------------------------------------------------------------------: |
|                           _Example of the image carousel, allowing artists to display multiple photos of their work_                            |

### Order Management

The order management system adapts its display and functionality based on user type, providing role-specific features whilst maintaining consistent styling.

Key Features:

- Dynamic role-based display
- Status-based action buttons
- Real-time order updates

```typescript
function OrdersTable({
  orders,
  userType,
  onAccept,
  onShip,
  onCancel,
  onPay,
}: OrdersTableProps) {
  return (
    <div className="table-container">
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Artwork</th>
            <th>{userType === "seller" ? "Buyer" : "Seller"}</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table body implementation */}
      </table>
    </div>
  );
}
```

| ![Example of an order table from an artist's perspective](/openstudio/src/assets/readme-images/Artist-order-table.png) |
| :---------------------------------------------------------------------------------------------------------: |
|                          _Example of an order table from an artist's perspective_                           |

| ![Example of an order table from a collector's perspective](/openstudio/src/assets/readme-images/Collectors-order-table.png) |
| :---------------------------------------------------------------------------------------------------------------: |
|                            _Example of an order table from a collector's perspective_                            |

### UK Shipping Calculator

Implements shipping calculations based on UK postal codes and zones, including insurance and handling costs.

```typescript
export const calculateShippingCost = ({
  weight,
  width,
  depth,
  height,
  price,
  fromPostcode,
  toPostcode,
}: ShippingParams): ShippingCosts => {
  const baseRate = 5;
  const weightFactor = 2;
  const volumeFactor = 0.001;
  const insuranceRate = 0.01;

  const fromZone = getZone(fromPostcode);
  const toZone = getZone(toPostcode);
  const zoneDifference = Math.abs(fromZone - toZone);

  const zoneMultiplier = 1 + zoneDifference * 0.2;
  const volume = width * height * depth;
  const volumeCost = volume * volumeFactor;
  const weightCost = weight * weightFactor;

  const baseShippingCost =
    (baseRate + weightCost + volumeCost) * zoneMultiplier;
  const insuranceCost = price * insuranceRate;

  return {
    baseShippingCost: Number(baseShippingCost.toFixed(2)),
    insuranceCost: Number(insuranceCost.toFixed(2)),
    totalShippingCost: Number((baseShippingCost + insuranceCost).toFixed(2)),
    totalPrice: Number((price + baseShippingCost + insuranceCost).toFixed(2)),
  };
};
```

<div align="center">

| ![Artwork price prior to shipping calculation](/openstudio/src/assets/readme-images/Artwork-preshipping.png) ![Artwork price post shipping calculation](/openstudio/src/assets/readme-images/Artwork-shipping.png) |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                              _Example of shipping formulas impact on an artwork's final price_                                                               |

</div>

# Development Challenges and Solutions

## Technical Challenges

### State Management & Data Flow

**Challenge:** Managing complex state across multiple components, especially with the order system's multiple states and user types.

**Solution:**

- Implemented clear state management within components
- Utilised callbacks and props for state sharing
- Created separate states for artists and collectors
- Built real-time notification system using polling

### Image Management

**Challenge:** Handling multiple image uploads and managing the relationship with Cloudinary.

**Solution:**

- Implemented structured image upload process
- Created typed interfaces for image handling
- Managed multiple image selections with preview functionality

### Order Processing Workflow

**Challenge:** Creating a complex order system with multiple states and user-specific actions.

**Solution:**

- Implemented clear status transitions
- Created separate views for buyers and sellers
- Built automated status update system

## UI/UX Challenges

### Form Validation

**Challenge:** Implementing comprehensive form validation, particularly for UK-specific address formats.

**Solution:**

- Created custom validation hooks
- Implemented real-time validation feedback
- Built specific UK postcode validation

## Project Management Challenges

### Feature Prioritisation

**Challenge:** Completing a full-featured marketplace in one week whilst learning new technologies.

**Solution:**

- Focussed on core functionality first
- Implemented MVP features before enhancements
- Utilised efficient component reuse strategies

### Testing and Debugging

**Challenge:** Ensuring application reliability whilst working under time constraints.

**Solution:**

- Implemented type checking for early error catching
- Utilised TypeScript for compile-time error prevention
- Created simple error handling systems

# Project Conclusion

## Key Achievements

### Technical Implementation

- Built full-featured React TypeScript marketplace in one week
- Designed and implemented bespoke UK shipping calculator
- Created custom form validation system for UK addresses
- Developed role-based authentication system
- Built real-time notification system without WebSocket support

### Personal Development

- Successfully delivered second TypeScript project, continuing to build experience
- Gained practical experience in full-stack development with Django and React
- Developed understanding of UK-specific business logic implementation
- Enhanced problem-solving skills through complex feature development

## Future Roadmap

### Technical Enhancements

- Implement global state management
- Add WebSocket integration for real-time updates
- Enhance error boundary system
- Build comprehensive test suite

### Feature Development

- Stripe payment integration
- Chat system between artists and collectors
- Artist collaboration tools for virtual exhibitions
- Mobile-optimised interface
- Advanced analytics for artists

## Lessons Learned

### Technical Insights

- Value of TypeScript in maintaining code quality
- Importance of planning component architecture
- Benefits of custom hooks for reusable logic
- Impact of proper error handling in user experience

### Project Management

- Importance of MVP approach in time-constrained development
- Value of clear feature prioritisation
- Benefits of modular development approach
- Impact of user-focused decision making

# Deployment

The live application can be accessed at [OpenStudio](https://openstudio.netlify.app/).
