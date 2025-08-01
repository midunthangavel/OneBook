# Wedding & Civil Ceremony Booking App - Technical Specification

## 📋 Overview

This application is designed to help users search, discover, and book their preferred wedding or civil ceremony venues (e.g., churches, mosques, halls, registry offices, hotels) along with associated services such as catering and decoration vendors. The app guides users through registration, profile creation, venue selection, and vendor coordination.

---

## Tech Stack
- Frontend: React Native with TypeScript, Expo and Expo router
- Backend/Database: Supabase
- UI Framework: React Native Paper
- AI Processing: DeepSeek

## 🔄 App Flow

### 1. Welcome Screen
- Display logo and app name
- Button: "Get Started"
- Redirects to Sign-Up screen

### 2. Sign-Up Screen
- **Required**: Phone number (with OTP verification)
- **Optional**: Email ID
- **Optional**: Social login (google, Apple ID)
- Request permissions:
  - Location Access
  - Notification Access

### 3. Profile Setup
- Input fields:
  - First Name
  - Last Name
  - Age
  - Date of Birth (Date Picker)
  - Address:
    - Address (Street)
    - District
    - State
    - Pincode
  - Email ID (optional if already provided)
- Button: "Save & Continue"

### 4. Main Dashboard

#### Top Section:
- Greeting: "Hello, [UserName]"
- Current Location (Auto-detected or manual input)

#### Category Row:
- **Marriage Venues** (churches, mosques, halls, etc.)
- **Decorations** (floral, stage, lighting, etc.)
- **Catering** (veg, non-veg, buffet, etc.)

#### Display List Under Each Category:
- Preview Cards showing:
  - Image
  - Name
  - Location
  - Distance from user
  - Rating / Reviews
  - Button: "View Details"

### 5. Vendor/Venue Details Page
- Cover image
- Description
- Location with map
- Available Dates (Calendar view)
- Services Offered
- Contact Information:
  - Phone number
  - WhatsApp link
- Button: "Book Now"

### 6. Booking Modal/Dialog
- Fields:
  - Select Date (Date Picker)
  - Optional Instructions/Requests
  - Auto-filled: User Name, Phone Number
- Button: "Submit"

**Post-Submission:**
- Confirmation Toast: "Your request has been sent!"
- Notify vendor via:
  - Phone call
  - WhatsApp message
- Store request in backend for tracking

---

## ⚙️ Feature Set

### User Features
- Sign up and create profile
- View venues and vendor options
- Filter by category and location
- View availability calendar
- Submit booking requests
- Contact vendors directly via phone/WhatsApp

### Vendor Features (Future Scope)
- Login to manage bookings
- Update availability calendar
- Upload venue/gallery images
- Respond to booking requests

---

## 🛠️ Technology Stack (Recommended)

### Frontend
- **React Native** or **Flutter**
- UI Libraries: Tailwind CSS (for web) / NativeBase (for mobile)

### Backend
- **Firebase** (Authentication, Firestore DB, Cloud Functions)
- Alternatively: Node.js + Express + MongoDB

### Other APIs
- **Google Maps API** (location & distance)
- **Firebase Cloud Messaging** (notifications)
- **WhatsApp Business API** (vendor communication)

---

## 🎨 UI/UX Guidelines

- Modern, clean design
- Soft colors (pastel or wedding-themed palette)
- Easy-to-use navigation
- Clear buttons and CTAs
- Responsive layout for mobile/tablet

---

## 📱 UI Design: User Interface (App)

### Screens

#### 1. Welcome Screen
- Logo, app name, Get Started

#### 2. Sign-Up Page
- OTP phone input, email, location permission

#### 3. Profile Page
- Form layout with clear sectioning

#### 4. Dashboard
- Greeting and location at top
- Horizontal scroll for category selection (Venues, Decorations, Catering)
- Scrollable cards under each category

#### 5. Vendor Details
- Banner image at top
- Info card layout with location and map
- Buttons for Contact and Book Now

#### 6. Booking Modal
- Clean modal overlay
- Date picker, optional notes, and Submit button

---

## 💻 UI Design: Admin Interface (Web Portal)

### Pages

#### 1. Admin Login
- Username, password input

#### 2. Dashboard
- Total bookings, active venues, user insights

#### 3. Venue Management
- Add/edit/delete venue
- Upload images
- Set available dates
- Assign vendor contact

#### 4. Vendor Management
- Add/edit catering/decor vendors
- Assign to venue or region

#### 5. Booking Requests
- List of recent user bookings
- Status: Pending / Confirmed / Declined
- Quick WhatsApp or call buttons

#### 6. Analytics
- Visual graphs for usage, bookings per month, popular venues

---

## 🚀 Future Enhancements

- User login with social accounts
- Payment gateway integration
- Admin dashboard for analytics
- Reviews & Ratings system
- AI-powered suggestions based on preferences
- In-app messaging between users and vendors

---

## 📁 Folder Structure (Suggested for Devs)

```
src/
├── components/
├── screens/
│   ├── WelcomeScreen.js
│   ├── SignUpScreen.js
│   ├── ProfileSetup.js
│   ├── Dashboard.js
│   ├── VendorList.js
│   ├── VendorDetails.js
│   └── BookingDialog.js
├── services/
│   ├── auth.js
│   ├── firebase.js
│   └── location.js
└── utils/
    ├── constants.js
    └── helpers.js
```

---

## 📊 Complete Database Schema (Supabase/PostgreSQL)

### Database Tables Structure

#### 1. **users** Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  age INTEGER GENERATED ALWAYS AS (EXTRACT(YEAR FROM AGE(date_of_birth))) STORED,
  address_street TEXT,
  address_district VARCHAR(100),
  address_state VARCHAR(100),
  address_pincode VARCHAR(10),
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  profile_image_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_phone CHECK (phone ~ '^\+[1-9]\d{1,14}$'),
  CONSTRAINT valid_email CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_age CHECK (age >= 18 AND age <= 120)
);

-- Indexes for performance
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_location ON users USING GIST (ll_to_earth(location_lat, location_lng));
```

#### 2. **venues** Table
```sql
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('church', 'mosque', 'hall', 'registry_office', 'hotel', 'garden', 'beach', 'other')),
  venue_type VARCHAR(50) NOT NULL CHECK (venue_type IN ('marriage_venue', 'catering', 'decoration', 'photography', 'music', 'transport')),
  
  -- Location Information
  address_street TEXT NOT NULL,
  address_district VARCHAR(100) NOT NULL,
  address_state VARCHAR(100) NOT NULL,
  address_pincode VARCHAR(10) NOT NULL,
  location_lat DECIMAL(10, 8) NOT NULL,
  location_lng DECIMAL(11, 8) NOT NULL,
  
  -- Contact Information
  contact_phone VARCHAR(20),
  contact_whatsapp VARCHAR(20),
  contact_email VARCHAR(255),
  website_url TEXT,
  
  -- Media
  cover_image_url TEXT,
  gallery_images TEXT[], -- Array of image URLs
  
  -- Pricing
  base_price DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  pricing_type VARCHAR(20) CHECK (pricing_type IN ('per_person', 'per_event', 'hourly', 'daily')),
  
  -- Capacity & Features
  max_capacity INTEGER,
  min_capacity INTEGER,
  features TEXT[], -- Array of features like ['parking', 'ac', 'kitchen', 'stage']
  
  -- Availability
  is_available BOOLEAN DEFAULT TRUE,
  available_dates DATE[],
  booking_advance_days INTEGER DEFAULT 30,
  
  -- Ratings & Reviews
  average_rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  
  -- Status
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  
  CONSTRAINT valid_phone CHECK (contact_phone IS NULL OR contact_phone ~ '^\+[1-9]\d{1,14}$'),
  CONSTRAINT valid_whatsapp CHECK (contact_whatsapp IS NULL OR contact_whatsapp ~ '^\+[1-9]\d{1,14}$'),
  CONSTRAINT valid_email CHECK (contact_email IS NULL OR contact_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_rating CHECK (average_rating >= 0 AND average_rating <= 5),
  CONSTRAINT valid_capacity CHECK (max_capacity >= min_capacity AND min_capacity > 0)
);

-- Indexes
CREATE INDEX idx_venues_category ON venues(category);
CREATE INDEX idx_venues_location ON venues USING GIST (ll_to_earth(location_lat, location_lng));
CREATE INDEX idx_venues_rating ON venues(average_rating DESC);
CREATE INDEX idx_venues_active ON venues(is_active) WHERE is_active = TRUE;
```

#### 3. **vendors** Table
```sql
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  
  -- Vendor Details
  business_name VARCHAR(255) NOT NULL,
  business_description TEXT,
  business_type VARCHAR(50) NOT NULL CHECK (business_type IN ('individual', 'company', 'partnership')),
  
  -- Services Offered
  services TEXT[], -- Array of services like ['catering', 'decoration', 'photography']
  specialties TEXT[], -- Array of specialties like ['indian_cuisine', 'floral_decor', 'wedding_photography']
  
  -- Business Information
  business_license VARCHAR(100),
  tax_id VARCHAR(100),
  years_experience INTEGER,
  
  -- Contact Information
  contact_phone VARCHAR(20) NOT NULL,
  contact_whatsapp VARCHAR(20),
  contact_email VARCHAR(255),
  business_address TEXT,
  
  -- Social Media
  social_media JSONB, -- {"instagram": "handle", "facebook": "page_url", "website": "url"}
  
  -- Verification
  is_verified BOOLEAN DEFAULT FALSE,
  verification_documents TEXT[], -- Array of document URLs
  verification_date TIMESTAMP WITH TIME ZONE,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_phone CHECK (contact_phone ~ '^\+[1-9]\d{1,14}$'),
  CONSTRAINT valid_whatsapp CHECK (contact_whatsapp IS NULL OR contact_whatsapp ~ '^\+[1-9]\d{1,14}$'),
  CONSTRAINT valid_email CHECK (contact_email IS NULL OR contact_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_experience CHECK (years_experience >= 0)
);

-- Indexes
CREATE INDEX idx_vendors_user_id ON vendors(user_id);
CREATE INDEX idx_vendors_venue_id ON vendors(venue_id);
CREATE INDEX idx_vendors_services ON vendors USING GIN(services);
CREATE INDEX idx_vendors_verified ON vendors(is_verified) WHERE is_verified = TRUE;
```

#### 4. **bookings** Table
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
  
  -- Booking Details
  event_date DATE NOT NULL,
  event_time TIME,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('wedding', 'civil_ceremony', 'engagement', 'reception', 'other')),
  guest_count INTEGER,
  
  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'declined', 'cancelled', 'completed')),
  
  -- Requirements
  special_requirements TEXT,
  dietary_preferences TEXT,
  decoration_preferences TEXT,
  
  -- Pricing
  quoted_price DECIMAL(10, 2),
  final_price DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Communication
  vendor_notified BOOLEAN DEFAULT FALSE,
  vendor_notified_at TIMESTAMP WITH TIME ZONE,
  user_notified BOOLEAN DEFAULT FALSE,
  user_notified_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT valid_guest_count CHECK (guest_count > 0),
  CONSTRAINT valid_event_date CHECK (event_date >= CURRENT_DATE),
  CONSTRAINT valid_prices CHECK (final_price IS NULL OR final_price >= 0)
);

-- Indexes
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_venue_id ON bookings(venue_id);
CREATE INDEX idx_bookings_vendor_id ON bookings(vendor_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_event_date ON bookings(event_date);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
```

#### 5. **reviews** Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  
  -- Review Details
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  
  -- Categories
  service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),
  cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  
  -- Media
  review_images TEXT[], -- Array of image URLs
  
  -- Status
  is_verified BOOLEAN DEFAULT FALSE,
  is_helpful INTEGER DEFAULT 0,
  is_reported BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT one_review_per_booking UNIQUE(booking_id)
);

-- Indexes
CREATE INDEX idx_reviews_venue_id ON reviews(venue_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
```

#### 6. **availability** Table
```sql
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  
  -- Availability Details
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  is_available BOOLEAN DEFAULT TRUE,
  
  -- Pricing for specific date
  price DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Notes
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_time_range CHECK (start_time IS NULL OR end_time IS NULL OR start_time < end_time),
  CONSTRAINT unique_availability UNIQUE(venue_id, vendor_id, date)
);

-- Indexes
CREATE INDEX idx_availability_venue_id ON availability(venue_id);
CREATE INDEX idx_availability_vendor_id ON availability(vendor_id);
CREATE INDEX idx_availability_date ON availability(date);
CREATE INDEX idx_availability_available ON availability(is_available) WHERE is_available = TRUE;
```

#### 7. **notifications** Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Notification Details
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('booking', 'reminder', 'promotion', 'system', 'vendor_response')),
  
  -- Related Data
  related_booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  related_venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  is_sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_notification CHECK (
    (type = 'booking' AND related_booking_id IS NOT NULL) OR
    (type = 'promotion' AND related_venue_id IS NOT NULL) OR
    (type IN ('reminder', 'system', 'vendor_response'))
  )
);

-- Indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_read ON notifications(is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

#### 8. **favorites** Table
```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT unique_favorite UNIQUE(user_id, venue_id)
);

-- Indexes
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_venue_id ON favorites(venue_id);
```

#### 9. **categories** Table
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_url TEXT,
  color VARCHAR(7), -- Hex color code
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, description, color, sort_order) VALUES
('Marriage Venues', 'Churches, mosques, halls, and other wedding venues', '#FF6B6B', 1),
('Catering', 'Food and beverage services', '#4ECDC4', 2),
('Decoration', 'Floral and decorative services', '#45B7D1', 3),
('Photography', 'Wedding photography and videography', '#96CEB4', 4),
('Music', 'Live music and DJ services', '#FFEAA7', 5),
('Transport', 'Wedding transportation services', '#DDA0DD', 6);
```

#### 10. **venue_categories** Table (Many-to-Many Relationship)
```sql
CREATE TABLE venue_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT unique_venue_category UNIQUE(venue_id, category_id)
);

-- Indexes
CREATE INDEX idx_venue_categories_venue_id ON venue_categories(venue_id);
CREATE INDEX idx_venue_categories_category_id ON venue_categories(category_id);
```

### Database Functions and Triggers

#### Update Average Rating Function
```sql
CREATE OR REPLACE FUNCTION update_venue_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE venues 
  SET 
    average_rating = (
      SELECT AVG(rating)::DECIMAL(3,2)
      FROM reviews 
      WHERE venue_id = NEW.venue_id
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews 
      WHERE venue_id = NEW.venue_id
    )
  WHERE id = NEW.venue_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_venue_rating
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_venue_rating();
```

#### Update Timestamp Function
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at column
CREATE TRIGGER trigger_update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_venues_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_vendors_updated_at BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_availability_updated_at BEFORE UPDATE ON availability FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Example RLS policies (implement based on your auth requirements)
-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Venues are publicly readable
CREATE POLICY "Venues are publicly readable" ON venues FOR SELECT USING (true);
CREATE POLICY "Only admins can modify venues" ON venues FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

### Database Views

#### Popular Venues View
```sql
CREATE VIEW popular_venues AS
SELECT 
  v.*,
  COUNT(b.id) as total_bookings,
  COUNT(r.id) as total_reviews,
  AVG(r.rating) as average_rating
FROM venues v
LEFT JOIN bookings b ON v.id = b.venue_id
LEFT JOIN reviews r ON v.id = r.venue_id
WHERE v.is_active = true
GROUP BY v.id
ORDER BY total_bookings DESC, average_rating DESC;
```

#### User Dashboard View
```sql
CREATE VIEW user_dashboard AS
SELECT 
  u.id as user_id,
  u.first_name,
  u.last_name,
  COUNT(DISTINCT b.id) as total_bookings,
  COUNT(DISTINCT f.id) as total_favorites,
  COUNT(DISTINCT r.id) as total_reviews
FROM users u
LEFT JOIN bookings b ON u.id = b.user_id
LEFT JOIN favorites f ON u.id = f.user_id
LEFT JOIN reviews r ON u.id = r.user_id
GROUP BY u.id, u.first_name, u.last_name;
```

### Data Types and Constraints Summary

| Table | Primary Key | Foreign Keys | Unique Constraints | Check Constraints |
|-------|-------------|--------------|-------------------|-------------------|
| users | UUID | - | phone, email | phone format, email format, age range |
| venues | UUID | created_by → users | - | category enum, venue_type enum, rating range |
| vendors | UUID | user_id → users, venue_id → venues | - | business_type enum, experience range |
| bookings | UUID | user_id → users, venue_id → venues, vendor_id → vendors | - | status enum, guest_count > 0, event_date >= today |
| reviews | UUID | user_id → users, venue_id → venues, booking_id → bookings | booking_id | rating range 1-5 |
| availability | UUID | venue_id → venues, vendor_id → vendors | venue_id, vendor_id, date | time range valid |
| notifications | UUID | user_id → users, related_booking_id → bookings, related_venue_id → venues | - | type enum, notification logic |
| favorites | UUID | user_id → users, venue_id → venues | user_id, venue_id | - |
| categories | UUID | - | name | - |
| venue_categories | UUID | venue_id → venues, category_id → categories | venue_id, category_id | - |

This comprehensive database schema provides:
- **Scalability**: Proper indexing and partitioning strategies
- **Data Integrity**: Comprehensive constraints and validations
- **Performance**: Optimized queries with appropriate indexes
- **Security**: Row Level Security policies
- **Flexibility**: JSONB fields for extensible data
- **Audit Trail**: Automatic timestamp management
- **Business Logic**: Triggers for calculated fields

---

## 🔧 Development Guidelines

### Code Standards
- Use TypeScript for better type safety
- Follow ESLint and Prettier configurations
- Write unit tests for critical functions
- Use meaningful variable and function names

### Security Considerations
- Implement proper input validation
- Use HTTPS for all API calls
- Sanitize user inputs
- Implement rate limiting for API endpoints
- Secure storage of sensitive data

### Performance Optimization
- Implement lazy loading for images
- Use pagination for large lists
- Optimize bundle size
- Implement caching strategies
- Use CDN for static assets

---

## 📱 Mobile App Considerations

### Platform-Specific Features
- **iOS**: Use native iOS design patterns
- **Android**: Follow Material Design guidelines
- **Cross-platform**: Ensure consistent experience

### Offline Capabilities
- Cache venue data for offline viewing
- Queue booking requests when offline
- Sync data when connection is restored

### Push Notifications
- Booking confirmations
- Vendor responses
- Special offers and updates

---

## 🌐 Web Portal Considerations

### Admin Dashboard Features
- Real-time booking notifications
- Bulk operations for venue management
- Export functionality for reports
- Advanced filtering and search

### Analytics Integration
- Google Analytics for user behavior
- Custom analytics for booking patterns
- Revenue tracking for vendors

---

## 🔄 API Endpoints (High-Level)

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/verify-otp` - OTP verification
- `POST /auth/login` - User login

### Venues
- `GET /venues` - List venues with filters
- `GET /venues/:id` - Get venue details
- `GET /venues/:id/availability` - Check availability

### Bookings
- `POST /bookings` - Create booking request
- `GET /bookings` - Get user bookings
- `PUT /bookings/:id/status` - Update booking status

### Admin
- `GET /admin/venues` - Manage venues
- `GET /admin/bookings` - View all bookings
- `PUT /admin/bookings/:id` - Update booking

---

## 📋 Testing Strategy

### Unit Testing
- Test individual components and functions
- Mock external dependencies
- Achieve 80%+ code coverage

### Integration Testing
- Test API endpoints
- Test database operations
- Test third-party integrations

### End-to-End Testing
- Test complete user flows
- Test booking process
- Test admin operations

---

## 🚀 Deployment Strategy

### Development Environment
- Local development with hot reload
- Staging environment for testing
- Production environment for live app

### CI/CD Pipeline
- Automated testing on code push
- Automated deployment to staging
- Manual approval for production

### Monitoring
- Error tracking with Sentry
- Performance monitoring
- User analytics

---

## 📞 Support & Maintenance

### User Support
- In-app help section
- FAQ page
- Contact support via chat/email

### Technical Support
- 24/7 monitoring
- Regular security updates
- Performance optimization
- Bug fixes and feature updates

---

## 💡 Conclusion

This app bridges the gap between couples looking to plan their wedding or ceremony and the venues/vendors available in their area. With a clean interface and clear booking flow, it simplifies the planning process and helps both users and service providers connect more efficiently.

The comprehensive technical specification provides a solid foundation for development, ensuring scalability, security, and user experience excellence.
