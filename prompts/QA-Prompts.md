# QA-Prompts.md

## Quality Assurance Prompts for SmartLoan

### Testing Strategy

#### Functional Testing
- **Sign In Page**:
  - Valid email/password combination
  - Invalid email format validation
  - Empty field validation
  - Session persistence
  - Password visibility toggle

- **Sign Up Page**:
  - Valid user registration flow
  - Password strength validation
  - Email already exists check
  - Terms agreement enforcement
  - Confirmation email sending

- **Forgot Password Page**:
  - Email validation
  - Reset link generation
  - 24-hour link expiry
  - Password update functionality

#### UI/UX Testing
- Responsive design on mobile/tablet/desktop
- Button hover states and interactions
- Form error message display
- Loading states during API calls
- Accessibility compliance (WCAG 2.1)

#### Performance Testing
- Page load time < 3 seconds
- API response time < 500ms
- Memory leak checks
- CSS and JavaScript bundle size optimization

#### Security Testing
- Password encryption validation
- SQL injection prevention
- XSS attack prevention
- CSRF token validation
- JWT token expiration
- Secure cookie settings

#### Cross-Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

#### Regression Testing
- Automated test suite for existing features
- CI/CD pipeline integration
- Test coverage > 80%

### Bug Reporting Template
- **Environment**: OS, Browser, Version
- **Steps to Reproduce**: Detailed steps
- **Expected Result**: What should happen
- **Actual Result**: What actually happened
- **Severity**: Critical, High, Medium, Low
- **Screenshots/Logs**: Supporting evidence

### Test Cases Documentation
- File location: `docs/TestCases.md`
- Format: BDD (Behavior-Driven Development)
- Scenarios: Happy path, edge cases, error scenarios
