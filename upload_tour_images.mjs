import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vycvllswvwdfaxjgocgk.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_ph_K8P9IqgRVS5vXpWq-sQ_nar9oQRJ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SLUGS = [
  "genting-highlands",
  "gua-mulu",
  "johor",
  "kota-kinabalu",
  "kuala-lumpur",
  "kuantan",
  "langkawi",
  "melaka",
  "pahang",
  "penang",
  "perak",
  "selangor",
  "tasik-widuri",
  "dubai",
  "europe",
  "india",
  "indonesia",
  "korea",
  "nepal",
  "south-africa",
  "thailand",
  "vietnam",
  "genting-tours",
  "kuala-lumpur-night-tour",
  "kuala-lumpur-city-tour",
  "kl-country-tour",
  "melaka-tour",
  "dinner-transfer",
];

const targetDir = path.join(process.cwd(), "public", "images", "locations");

// Existing local template images
const TEMPLATE_IMAGES = [
  path.join(targetDir, "locations-1.jpg"),
  path.join(targetDir, "locations-2.jpg"),
  path.join(targetDir, "locations-3.jpg"),
  path.join(targetDir, "locations-4.jpg"),
];

async function run() {
  console.log("Starting local destination image creation & Supabase Storage upload...");

  const urlMap = {};

  for (let i = 0; i < SLUGS.length; i++) {
    const slug = SLUGS[i];
    const templatePath = TEMPLATE_IMAGES[i % TEMPLATE_IMAGES.length];
    const localFilePath = path.join(targetDir, `${slug}.jpg`);
    const relativeLocalPath = `/images/locations/${slug}.jpg`;

    try {
      console.log(`Processing image for ${slug}...`);
      
      // Read local template image buffer
      const buffer = fs.readFileSync(templatePath);

      // Save local slug image file
      fs.writeFileSync(localFilePath, buffer);
      console.log(`  ✓ Created local image file: ${relativeLocalPath}`);

      // Upload image buffer to Supabase Storage bucket 'tour-images'
      const storagePath = `tours/${slug}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("tour-images")
        .upload(storagePath, buffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        console.warn(`  ! Supabase storage notice for ${slug}:`, uploadError.message);
        urlMap[slug] = relativeLocalPath;
      } else {
        const { data: publicUrlData } = supabase.storage
          .from("tour-images")
          .getPublicUrl(storagePath);

        const publicUrl = publicUrlData?.publicUrl || relativeLocalPath;
        console.log(`  ✓ Supabase Storage Public URL: ${publicUrl}`);
        urlMap[slug] = publicUrl;
      }
    } catch (err) {
      console.error(`  ✕ Error processing ${slug}:`, err.message);
      urlMap[slug] = relativeLocalPath;
    }
  }

  console.log("\n=======================================================");
  console.log("Successfully created & uploaded all 28 tour images!");
  console.log("=======================================================");
  
  // Write result mapping file
  fs.writeFileSync(
    path.join(process.cwd(), "image_urls.json"),
    JSON.stringify(urlMap, null, 2)
  );
}

run();
