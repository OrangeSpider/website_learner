"""Supabase client initialization."""

import os

from supabase import create_client, Client

# Pull connection info from the environment
url: str = os.environ["SUPABASE_URL"]
api_key: str = os.environ["SUPABASE_API_KEY"]

# Export a configured client instance for use in the app
supabase: Client = create_client(url, api_key)

