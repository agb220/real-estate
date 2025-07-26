'use client'
import { useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'

const SubscribeForm = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('click', email) // ← додай це

    if (!validateEmail(email)) {
      setError('Invalid email')
    } else {
      setError('')
      setEmail('')
      console.log('Subscribed with:', email)
    }
  }

  return (
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <Input
        placeholder="Your e-mail address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      />
      <Button typeBtn="outline" titlebtn="Subscribe" type="submit" />
    </form>
  )
}

export default SubscribeForm
