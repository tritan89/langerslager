// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/utils/supabase'
import { ContactFormData } from '@/types/beers'

type ResponseData = {
  success: boolean
  message: string
  id?: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  try {
    const formData = req.body as ContactFormData

    // Validate required fields
    if (!formData.name || !formData.email || !formData.beerType || !formData.quantity) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' })
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone?.trim() || null,
          beer_type: formData.beerType.trim(),
          quantity: formData.quantity.trim(),
          occasion: formData.occasion?.trim() || null,
          message: formData.message?.trim() || null,
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to save submission. Please try again.' 
      })
    }

    // Log successful submission
    console.log('Contact form submission saved:', {
      id: data.id,
      name: formData.name,
      email: formData.email,
      beerType: formData.beerType,
      timestamp: new Date().toISOString()
    })

    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for your submission! We\'ll get back to you within 48 hours.',
      id: data.id
    })

  } catch (error) {
    console.error('Unexpected error processing form submission:', error)
    return res.status(500).json({ 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.' 
    })
  }
}
