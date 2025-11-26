// Test script to check Supabase connection and database state
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

try {
  // Read environment variables
  const envContent = readFileSync('.env.local', 'utf8');
  const envLines = envContent.split('\n');
  const supabaseUrl = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')).split('=')[1];
  const supabaseKey = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=')).split('=')[1];

  console.log('🔍 Checking Supabase Database Setup...\n');

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Test all tables
  const tables = ['projects', 'team_members', 'services', 'blog_posts', 'contact_submissions', 'newsletter_subscribers', 'appointments', 'client_projects'];

  let allTablesExist = true;

  for (const table of tables) {
    console.log(`Testing ${table} table...`);
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error) {
        console.error(`❌ ${table}: ${error.message}`);
        allTablesExist = false;
      } else {
        console.log(`✅ ${table}: ${data?.length || 0} records found`);
      }
    } catch (err) {
      console.error(`❌ ${table}: ${err.message}`);
      allTablesExist = false;
    }
  }

  console.log('\n' + '='.repeat(50));

  if (allTablesExist) {
    console.log('🎉 All database tables are properly set up!');
    console.log('Your SaaS application should be ready to run.');
  } else {
    console.log('⚠️  Database setup is incomplete.');
    console.log('Please run the setup-supabase-remote.sql script in your Supabase dashboard.');
  }

} catch (err) {
  console.error('❌ Error:', err.message);
}