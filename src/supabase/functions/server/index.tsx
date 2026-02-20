import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c2122655/health", (c) => {
  return c.json({ status: "ok" });
});

// ===== AUTH ROUTES =====

// Sign up
app.post("/make-server-c2122655/auth/signup", async (c) => {
  try {
    const { email, password, name, userType, phone } = await c.req.json();
    
    if (!email || !password || !name || !userType) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, userType, phone },
      email_confirm: true, // Auto-confirm since no email server configured
    });

    if (authError) {
      console.error("Auth error during signup:", authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store user profile in KV store
    const userId = authData.user.id;
    const userProfile = {
      id: userId,
      email,
      name,
      userType,
      phone: phone || '',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`user:${userId}`, userProfile);

    // If artisan, create artisan profile
    if (userType === 'artisan') {
      const artisanProfile = {
        id: userId,
        name,
        email,
        phone: phone || '',
        trade: '',
        skills: [],
        priceRange: '',
        hourlyRate: '',
        availability: 'Disponible',
        location: 'Lubumbashi',
        verified: false,
        description: '',
        photo: '',
        rating: 5.0,
        reviewCount: 0,
        experience: '',
        completedJobs: 0,
        whatsapp: phone || '',
        createdAt: new Date().toISOString(),
      };
      
      await kv.set(`artisan:${userId}`, artisanProfile);
      await kv.set(`artisan_by_email:${email}`, userId);
    }

    return c.json({ 
      message: "User created successfully",
      userId 
    });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Sign in
app.post("/make-server-c2122655/auth/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: "Email and password required" }, 400);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
      return c.json({ error: error.message }, 401);
    }

    // Get user profile from KV store
    const userProfile = await kv.get(`user:${data.user.id}`);

    return c.json({
      accessToken: data.session.access_token,
      user: userProfile || {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || '',
        userType: data.user.user_metadata?.userType || 'client',
        phone: data.user.user_metadata?.phone || '',
      }
    });
  } catch (error) {
    console.error("Sign in error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get current user
app.get("/make-server-c2122655/auth/me", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No token provided" }, 401);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.error("Get user error:", error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user profile from KV store
    const userProfile = await kv.get(`user:${user.id}`);

    return c.json({
      user: userProfile || {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || '',
        userType: user.user_metadata?.userType || 'client',
        phone: user.user_metadata?.phone || '',
      }
    });
  } catch (error) {
    console.error("Get user error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// ===== ARTISANS ROUTES =====

// Get all artisans (with optional filters)
app.get("/make-server-c2122655/artisans", async (c) => {
  try {
    const trade = c.req.query('trade');
    const available = c.req.query('available');
    
    // Get all artisan profiles
    const artisanKeys = await kv.getByPrefix('artisan:');
    let artisans = artisanKeys.map(item => item.value);

    // Apply filters
    if (trade) {
      artisans = artisans.filter(a => a.trade?.toLowerCase() === trade.toLowerCase());
    }
    if (available === 'true') {
      artisans = artisans.filter(a => a.availability === 'Disponible');
    }

    return c.json({ artisans });
  } catch (error) {
    console.error("Get artisans error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get artisan by ID
app.get("/make-server-c2122655/artisans/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const artisan = await kv.get(`artisan:${id}`);
    
    if (!artisan) {
      return c.json({ error: "Artisan not found" }, 404);
    }

    return c.json({ artisan });
  } catch (error) {
    console.error("Get artisan error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Update artisan profile (requires auth)
app.put("/make-server-c2122655/artisans/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No token provided" }, 401);
    }

    // Verify user
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user || user.id !== id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get existing artisan profile
    const existingArtisan = await kv.get(`artisan:${id}`);
    if (!existingArtisan) {
      return c.json({ error: "Artisan profile not found" }, 404);
    }

    // Update profile
    const updates = await c.req.json();
    const updatedArtisan = {
      ...existingArtisan,
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`artisan:${id}`, updatedArtisan);

    return c.json({ artisan: updatedArtisan });
  } catch (error) {
    console.error("Update artisan error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// ===== REQUESTS ROUTES =====

// Get requests for an artisan (requires auth)
app.get("/make-server-c2122655/requests/artisan/:artisanId", async (c) => {
  try {
    const artisanId = c.req.param('artisanId');
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No token provided" }, 401);
    }

    // Verify user
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user || user.id !== artisanId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get all requests for this artisan
    const requestKeys = await kv.getByPrefix(`request:artisan:${artisanId}:`);
    const requests = requestKeys.map(item => item.value);

    return c.json({ requests });
  } catch (error) {
    console.error("Get requests error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Create a new request
app.post("/make-server-c2122655/requests", async (c) => {
  try {
    const requestData = await c.req.json();
    
    const { artisanId, clientName, clientPhone, service, description, location, urgency, budget } = requestData;
    
    if (!artisanId || !clientName || !clientPhone || !service) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Generate unique ID
    const requestId = crypto.randomUUID();
    
    const request = {
      id: requestId,
      artisanId,
      clientName,
      clientPhone,
      service,
      description: description || '',
      location: location || '',
      urgency: urgency || 'Flexible',
      budget: budget || '',
      date: new Date().toISOString(),
      status: 'new',
    };

    await kv.set(`request:artisan:${artisanId}:${requestId}`, request);

    return c.json({ request });
  } catch (error) {
    console.error("Create request error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Update request status (requires auth)
app.put("/make-server-c2122655/requests/:id", async (c) => {
  try {
    const requestId = c.req.param('id');
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No token provided" }, 401);
    }

    // Verify user
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { status } = await c.req.json();
    
    // Find the request
    const requestKeys = await kv.getByPrefix(`request:artisan:${user.id}:`);
    const requestItem = requestKeys.find(item => item.value.id === requestId);
    
    if (!requestItem) {
      return c.json({ error: "Request not found" }, 404);
    }

    // Update status
    const updatedRequest = {
      ...requestItem.value,
      status,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(requestItem.key, updatedRequest);

    return c.json({ request: updatedRequest });
  } catch (error) {
    console.error("Update request error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// ===== TRADES ROUTES =====

// Get all trades
app.get("/make-server-c2122655/trades", async (c) => {
  try {
    // Get all artisans to count by trade
    const artisanKeys = await kv.getByPrefix('artisan:');
    const artisans = artisanKeys.map(item => item.value);
    
    // Count artisans by trade
    const tradeCounts: Record<string, number> = {};
    artisans.forEach(artisan => {
      if (artisan.trade) {
        tradeCounts[artisan.trade] = (tradeCounts[artisan.trade] || 0) + 1;
      }
    });

    // Common trades
    const commonTrades = [
      { id: '1', name: 'Électricien', icon: '⚡', count: tradeCounts['Électricien'] || 0 },
      { id: '2', name: 'Plombier', icon: '🔧', count: tradeCounts['Plombier'] || 0 },
      { id: '3', name: 'Menuisier', icon: '🪚', count: tradeCounts['Menuisier'] || 0 },
      { id: '4', name: 'Mécanicien', icon: '🔩', count: tradeCounts['Mécanicien'] || 0 },
      { id: '5', name: 'Peintre', icon: '🎨', count: tradeCounts['Peintre'] || 0 },
      { id: '6', name: 'Maçon', icon: '🧱', count: tradeCounts['Maçon'] || 0 },
    ];

    return c.json({ trades: commonTrades });
  } catch (error) {
    console.error("Get trades error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

// ===== DATA INITIALIZATION (DEMO) =====

// Initialize demo data (for testing only)
app.post("/make-server-c2122655/init-demo-data", async (c) => {
  try {
    console.log("Initializing demo data...");
    
    // Check if already initialized
    const existingData = await kv.getByPrefix('artisan:');
    if (existingData.length > 0) {
      return c.json({ message: "Demo data already exists", count: existingData.length });
    }

    // Create demo artisan accounts
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const demoArtisans = [
      {
        email: 'patrick.kabamba@example.com',
        password: 'demo1234',
        name: 'Patrick Kabamba',
        phone: '+243 999 123 456',
        trade: 'Électricien',
        skills: ['Installation électrique', 'Dépannage', 'Panneaux solaires', 'Câblage'],
        priceRange: 'Moyen',
        hourlyRate: '25 USD/h',
        description: 'Électricien professionnel avec 8 ans d\'expérience. Spécialisé dans les installations résidentielles et commerciales.',
        experience: '8 ans',
        location: 'Quartier Industriel, Lubumbashi',
      },
      {
        email: 'jean.mukendi@example.com',
        password: 'demo1234',
        name: 'Jean Mukendi',
        phone: '+243 999 234 567',
        trade: 'Plombier',
        skills: ['Plomberie générale', 'Réparation fuites', 'Installation sanitaire', 'Débouchage'],
        priceRange: 'Économique',
        hourlyRate: '20 USD/h',
        description: 'Plombier expérimenté, disponible 7j/7 pour dépannages. Travail soigné et garantie sur toutes les interventions.',
        experience: '6 ans',
        location: 'Quartier Kenya, Lubumbashi',
      },
      {
        email: 'marie.tshilombo@example.com',
        password: 'demo1234',
        name: 'Marie Tshilombo',
        phone: '+243 999 345 678',
        trade: 'Menuisier',
        skills: ['Meubles sur mesure', 'Portes et fenêtres', 'Réparation', 'Aménagement'],
        priceRange: 'Premium',
        hourlyRate: '35 USD/h',
        description: 'Menuisière créative spécialisée dans le mobilier sur mesure. Qualité artisanale garantie.',
        experience: '10 ans',
        location: 'Quartier Kampemba, Lubumbashi',
      },
    ];

    let createdCount = 0;
    for (const artisan of demoArtisans) {
      try {
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: artisan.email,
          password: artisan.password,
          user_metadata: { name: artisan.name, userType: 'artisan', phone: artisan.phone },
          email_confirm: true,
        });

        if (authError) {
          console.error(`Error creating artisan ${artisan.name}:`, authError);
          continue;
        }

        const userId = authData.user.id;

        // Store user profile
        await kv.set(`user:${userId}`, {
          id: userId,
          email: artisan.email,
          name: artisan.name,
          userType: 'artisan',
          phone: artisan.phone,
          createdAt: new Date().toISOString(),
        });

        // Store artisan profile
        await kv.set(`artisan:${userId}`, {
          id: userId,
          name: artisan.name,
          email: artisan.email,
          phone: artisan.phone,
          trade: artisan.trade,
          skills: artisan.skills,
          priceRange: artisan.priceRange,
          hourlyRate: artisan.hourlyRate,
          availability: 'Disponible',
          location: artisan.location,
          verified: true,
          description: artisan.description,
          photo: '',
          rating: 4.8 + Math.random() * 0.2,
          reviewCount: Math.floor(Math.random() * 50) + 20,
          experience: artisan.experience,
          completedJobs: Math.floor(Math.random() * 100) + 50,
          whatsapp: artisan.phone.replace(/\s/g, ''),
          createdAt: new Date().toISOString(),
        });

        createdCount++;
        console.log(`Created artisan: ${artisan.name}`);
      } catch (err) {
        console.error(`Error creating ${artisan.name}:`, err);
      }
    }

    return c.json({ 
      message: "Demo data initialized successfully",
      created: createdCount,
      note: "Demo accounts: password is 'demo1234' for all artisans"
    });
  } catch (error) {
    console.error("Init demo data error:", error);
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);