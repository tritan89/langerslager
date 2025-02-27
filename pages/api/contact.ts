// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type ContactFormData = {
  name: string
  email: string
  phone: string
  beerType: string
  quantity: string
  occasion: string
  message: string
}

type ResponseData = {
  success: boolean
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  try {
    const data = req.body as ContactFormData

    // Validate required fields
    if (!data.name || !data.email || !data.beerType || !data.quantity) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    // Here you would typically:
    // 1. Store the submission in a database
    // 2. Send an email notification
    // 3. Process the data as needed

    // For now, we'll just log it
    console.log('Received form submission:', data)

    // Simulate a delay to mimic processing
    setTimeout(() => {
      return res.status(200).json({ success: true, message: 'Form submitted successfully' })
    }, 1000)
  } catch (error) {
    console.error('Error processing form submission:', error)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}
