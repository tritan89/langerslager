import { createServerClient } from '@supabase/ssr'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { type GetServerSidePropsContext } from 'next'

export function createSupabaseServerClient(
  context: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse }
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = context.req.cookies
          return Object.entries(cookies).map(([name, value]) => ({
            name,
            value: value ?? '',
          }))
        },
        setAll(cookiesToSet) {
          const res = context.res as NextApiResponse
          cookiesToSet.forEach(({ name, value, options }) => {
            const parts = [`${name}=${value}`]
            if (options?.path) parts.push(`Path=${options.path}`)
            if (options?.maxAge) parts.push(`Max-Age=${options.maxAge}`)
            if (options?.domain) parts.push(`Domain=${options.domain}`)
            if (options?.sameSite) parts.push(`SameSite=${options.sameSite}`)
            if (options?.secure) parts.push('Secure')
            if (options?.httpOnly) parts.push('HttpOnly')
            res.appendHeader('Set-Cookie', parts.join('; '))
          })
        },
      },
    }
  )
}

export function createSupabaseAdminClient() {
  const { createClient } = require('@supabase/supabase-js')
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
