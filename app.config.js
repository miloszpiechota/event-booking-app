import 'dotenv/config';

export default {
  expo: {
    name: 'YourApp',
    slug: 'your-app',
    version: '1.0.0',
    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      SUPABASE_FUNCTION_DOMAIN: process.env.SUPABASE_FUNCTION_DOMAIN,
      QR_SECRET_KEY: process.env.QR_SECRET_KEY,
    },
  },
};
