# TODO: Issues to Fix Later

## Build Errors Fixed Temporarily (Need Proper Fix)

### 1. Image Type Mismatch
**Files:** 
- `src/components/image/image-data-table.tsx`
- `src/components/image/images-data-table.tsx`
- `src/components/image-data-card-view.tsx`

**Issue:** Different Image interfaces causing type conflicts
**Temp Fix:** Commented out ImageCardView components
**Need:** Standardize Image interface across the app

### 2. Roles API Type Issues
**File:** `src/lib/api/roles.ts`
**Issue:** API response types don't match expected return types
**Temp Fix:** Need to comment out API calls and return mock data
**Need:** Fix ApiResponse<T> vs { data: T } mismatch

### 3. Products Section Missing Properties
**File:** `src/components/section/innovation/products-section.tsx`
**Issue:** ProductDetail interface missing `icon`, `color`, `image` properties
**Temp Fix:** Used default values and hardcoded gradients
**Need:** Update ProductDetail interface or data structure

### 4. Input System Type Conflicts
**File:** `src/components/input/core/BaseInput.tsx`
**Issue:** HTML input `size` prop conflicts (number vs string)
**Temp Fix:** Used Omit to exclude HTML size prop
**Need:** Rename custom size prop to avoid conflict

### 5. SelectSystem Ref Issues
**File:** `src/components/input/systems/SelectSystem.tsx`
**Issue:** forwardRef type constraints
**Temp Fix:** Used SelectPrimitive.Root directly
**Need:** Fix forwardRef types properly

## Admin Features Temporarily Disabled

### Image Management
- All ImageCardView components commented out
- Shows "temporarily disabled" message
- Admin image management not working

### Widget System
- Removed widgetOLD directory (was causing build errors)
- New OOP widget system working fine

## Notes

- **Priority:** Frontend/homepage must work first for production
- **Deployment:** GitHub Actions cleaned up (removed DB migrations)
- **Backend:** Now connects to separate NestJS backend
- **Environment:** Only need NEXT_PUBLIC_API_URL and NEXT_PUBLIC_GA_MEASUREMENT_ID

## Working Features

✅ Homepage with WavyBackground
✅ Story page redesigned  
✅ Skills component supports light/dark mode
✅ New widget system (grid category added)
✅ Hero section simplified and clean
✅ Build process works
✅ Deployment pipeline updated

## Next Steps When Time Allows

1. Fix Image interface standardization
2. Fix API response type consistency  
3. Re-enable admin image management
4. Fix SelectSystem forwardRef types
5. Update ProductDetail interface
6. Test all admin functionality