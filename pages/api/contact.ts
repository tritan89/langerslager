// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import { supabase } from '@/utils/supabase'
import { ContactFormData } from '@/types/beers'

const PRICES: Record<string, string> = { '5': '$170', '10': '$300' }

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

    // Validate phone format if provided
    if (formData.phone && !/^[\d\s\-().+]+$/.test(formData.phone.trim())) {
      return res.status(400).json({ success: false, message: 'Invalid phone number format' })
    }

    // Validate quantity
    if (formData.quantity !== '5' && formData.quantity !== '10') {
      return res.status(400).json({ success: false, message: 'Invalid quantity' })
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
          quantity: formData.quantity,
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

    // Send confirmation email
    const price = PRICES[formData.quantity] || formData.quantity

    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: "Langer's Lager <noreply@langerslager.com>",
        to: formData.email.trim().toLowerCase(),
        subject: "We got your custom brew request!",
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
            <h1 style="font-size: 24px; margin-bottom: 8px;">Thanks, ${formData.name.trim().split(' ')[0]}!</h1>
            <p style="color: #555; line-height: 1.6;">
              We've received your custom brewing request and will get back to you within 48 hours.
              Here's a summary of what you sent us:
            </p>
            <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; width: 140px;">Beer style</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${formData.beerType}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Quantity</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${formData.quantity} gallons — ${price}</td>
              </tr>
              ${formData.occasion ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Occasion</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${formData.occasion}</td>
              </tr>` : ''}
              ${formData.eventDate ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888;">Event date</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${formData.eventDate}</td>
              </tr>` : ''}
            </table>
            <p style="background: #fef9f0; padding: 16px; border-left: 3px solid #d4a853; color: #555; line-height: 1.6;">
              <strong>Lead time reminder:</strong> We need at least 2 weeks to brew your batch.
              If your event is coming up soon, we'll reach out right away to discuss timing.
            </p>
            <p style="color: #888; font-size: 13px; margin-top: 32px;">
              Langer's Lager · 123 Brew Lane, Craftsville, BC
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      // Log but don't fail the request — the submission was saved
      console.error('Failed to send confirmation email:', emailError)
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
