import { createClient } from '@supabase/supabase-js';
import { Buffer } from 'buffer';

export const handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    const supabaseUrl = process.env.SUPABASE_DATABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Supabase env eksik',
          url: !!supabaseUrl,
          key: !!supabaseKey,
        }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = JSON.parse(event.body || '{}');
    const { file, fileName, contentType } = body;

    if (!file || !fileName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Dosya verisi eksik' }),
      };
    }

    const buffer = Buffer.from(file, 'base64');

function sanitizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/İ/g, "i")
    .replace(/[^a-z0-9.-]/g, "_");
}

const safeFileName = sanitizeFileName(fileName);


    const { data, error } = await supabase
      .storage
      .from('uploads') // 👈 bucket adı BİREBİR aynı olmalı
      .upload(`files/${Date.now()}-${safeFileName}`, buffer, {
        contentType: contentType || 'application/octet-stream',
      });

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
          details: error,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Catch error',
        message: err.message,
      }),
    };
  }
};
