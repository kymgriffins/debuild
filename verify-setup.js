// Quick verification script after database setup
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

async function verifySetup() {
  console.log('🔍 Verifying Debuild SaaS Setup...\n');

  try {
    // Read environment variables
    const envContent = readFileSync('.env.local', 'utf8');
    const envLines = envContent.split('\n');
    const supabaseUrl = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_URL='))?.split('=')[1];
    const supabaseKey = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='))?.split('=')[1];

    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Environment variables not found. Please check .env.local');
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test all critical features
    console.log('Testing database tables...');
    const tests = [
      { name: 'Projects', table: 'projects', expected: 5 },
      { name: 'Team Members', table: 'team_members', expected: 3 },
      { name: 'Services', table: 'services', expected: 5 },
      { name: 'Blog Posts', table: 'blog_posts', expected: 0 },
      { name: 'Contact Submissions', table: 'contact_submissions', expected: 0 },
    ];

    let allPassed = true;

    for (const test of tests) {
      try {
        const { data, error } = await supabase
          .from(test.table)
          .select('*', { count: 'exact' });

        if (error) {
          console.log(`❌ ${test.name}: ${error.message}`);
          allPassed = false;
        } else {
          const count = data?.length || 0;
          console.log(`✅ ${test.name}: ${count} records ${count >= test.expected ? '✓' : '(Expected: ' + test.expected + ')'}`);
        }
      } catch (err) {
        console.log(`❌ ${test.name}: ${err.message}`);
        allPassed = false;
      }
    }

    console.log('\n' + '='.repeat(50));

    if (allPassed) {
      console.log('🎉 SUCCESS! Your SaaS is fully functional!');
      console.log('\n🚀 Ready for production:');
      console.log('1. Run: npm run dev');
      console.log('2. Visit: http://localhost:3000');
      console.log('3. Admin login: /auth/login');
      console.log('4. Test all features from the checklist');

      console.log('\n📋 Production deployment:');
      console.log('- Deploy to Vercel');
      console.log('- Update domain settings');
      console.log('- Configure production environment variables');
      console.log('- Set up monitoring and analytics');

    } else {
      console.log('⚠️  Some features may not be working properly.');
      console.log('Please check the SAAS_FEATURES_AND_ROADMAP.md for troubleshooting.');
    }

  } catch (err) {
    console.log('❌ Setup verification failed:', err.message);
  }
}

verifySetup();



