'use client'
import { useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'

const ContactUsForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError('Invalid email')
      return
    }

    setError('')

    console.log({ name, email, message })

    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <Input
        placeholder="Your name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        label="Full name"
      />
      <Input
        placeholder="Your e-mail address"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        error={error}
        label="Email"
      />
      <Input
        textarea
        placeholder="Your message"
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        label="Your Message"
      />
      <Button typeBtn="outline" titlebtn="Send Message" type="submit" />
    </form>
  )
}

export default ContactUsForm
