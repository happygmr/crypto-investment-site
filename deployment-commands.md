# 🚀 Deployment Commands Reference

## **Railway Backend Commands**

### Initial Setup
```bash
# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Clear and cache configurations
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Variables (Railway Dashboard)
```bash
APP_NAME="Crypto Investment Platform"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-backend.railway.app

DB_CONNECTION=mysql
DB_HOST=your-mysql-host.railway.app
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=your-password

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-mailtrap-username
MAIL_PASSWORD=your-mailtrap-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="Crypto Investment Platform"

FRONTEND_URL=https://your-frontend.vercel.app
```

## **Vercel Frontend Commands**

### Environment Variables (Vercel Dashboard)
```bash
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_APP_NAME="Crypto Investment Platform"
NEXT_PUBLIC_APP_URL=https://your-frontend.vercel.app
```

## **Testing Commands**

### Backend API Testing
```bash
# Test health endpoint
curl https://your-backend.railway.app/

# Test API endpoint
curl https://your-backend.railway.app/api

# Test registration (replace with your data)
curl -X POST https://your-backend.railway.app/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Frontend Testing
```bash
# Check if frontend loads
curl https://your-frontend.vercel.app

# Check environment variables are loaded
# Visit your frontend URL and check browser console
```

## **Troubleshooting Commands**

### Check Railway Logs
```bash
# View deployment logs in Railway dashboard
# Or use Railway CLI if installed
railway logs
```

### Check Vercel Logs
```bash
# View deployment logs in Vercel dashboard
# Or use Vercel CLI if installed
vercel logs
```

### Database Connection Test
```bash
# Test database connection from Railway
php artisan tinker
# Then run: DB::connection()->getPdo();
```

## **Performance Commands**

### Laravel Optimization
```bash
# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize

# Clear caches if needed
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Next.js Optimization
```bash
# Build for production
npm run build

# Start production server
npm start
```

## **Monitoring Commands**

### Health Check Endpoints
```bash
# Backend health
curl https://your-backend.railway.app/

# API health
curl https://your-backend.railway.app/api

# Frontend health
curl https://your-frontend.vercel.app
```

### Database Status
```bash
# Check migration status
php artisan migrate:status

# Check database connection
php artisan db:show
``` 