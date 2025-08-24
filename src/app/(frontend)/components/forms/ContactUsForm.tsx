'use client'
import { useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'

interface ContactUsFormProps {
  closeModal?: (arg: boolean) => void
}

const ContactUsForm = ({ closeModal }: ContactUsFormProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: typeof errors = {}

    if (!name.length) newErrors.name = 'Enter your name'
    if (!validateEmail(email)) newErrors.email = 'Invalid email'
    if (!message.length) newErrors.message = 'Enter your message'

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    console.log({ name, email, message })

    setName('')
    setEmail('')
    setMessage('')
    closeModal && closeModal(false)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <Input
        placeholder="Your name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        label="Full name"
        error={errors.name}
      />
      <Input
        placeholder="Your e-mail address"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        error={errors.email}
        label="Email"
      />
      <Input
        textarea
        placeholder="Your message"
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        label="Your Message"
        error={errors.message}
      />
      <Button typeBtn="outline" titlebtn="Send Message" type="submit" />
    </form>
  )
}

export default ContactUsForm
