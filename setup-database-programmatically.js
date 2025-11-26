// Programmatic database setup script
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

async function setupDatabase() {
  try {
    console.log('🚀 Setting up Supabase database programmatically...\n');

    // Read environment variables
    const envContent = readFileSync('.env.local', 'utf8');
    const envLines = envContent.split('\n');
    const supabaseUrl = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')).split('=')[1];
    const supabaseKey = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=')).split('=')[1];

    // For schema changes, we need service role key, but let's try with anon key first
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('⚠️  Note: This script may fail if using anon key.');
    console.log('For full database setup, you may need to run the SQL script manually in Supabase dashboard.\n');

    // Try to run a simple query to test connection
    const { data: testData, error: testError } = await supabase
      .from('projects')
      .select('count', { count: 'exact', head: true });

    if (testError && testError.message.includes('relation "public.projects" does not exist')) {
      console.log('❌ Projects table does not exist.');
      console.log('📋 Please run the following in your Supabase SQL Editor:\n');

      // Read and display the setup script
      const setupScript = readFileSync('setup-supabase-remote.sql', 'utf8');
      console.log('--- COPY EVERYTHING BELOW THIS LINE ---');
      console.log(setupScript);
      console.log('--- END OF SCRIPT ---');

      console.log('\n📍 Steps:');
      console.log('1. Go to https://supabase.com/dashboard/project/qhgrhxjfwpfihnanenep');
      console.log('2. Click "SQL Editor" in the left sidebar');
      console.log('3. Paste the entire script above');
      console.log('4. Click "Run"');

      return;
    }

    console.log('✅ Database appears to be set up already!');
    console.log('You can now run your application.');

  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

setupDatabase();



