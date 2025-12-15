import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hphlutbhgpcyzahjgpxv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwaGx1dGJoZ3BjeXphaGpncHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNjk0MTUsImV4cCI6MjA3NzY0NTQxNX0.Iap0BqbX8TtcObqkDCz78-xMQY7dzDMokVhm3jZgg0g";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

