import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_DATABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Body boş' }),
      };
    }

    const { name } = JSON.parse(event.body);

    const { data, error } = await supabase
      .from('users')
      .insert([{ name }])
      .select();

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
        error: 'Server error',
        message: err.message,
      }),
    };
  }
};
