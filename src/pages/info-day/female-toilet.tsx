import { useState } from 'react'

export default function FemaleTiolet() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email) {
      alert('Please enter a valid email address.')
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch('/api/random-code', {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        setCode(data.code)
        setIsSubmitted(true)
      } else {
        const text = await response.text()
        window.alert(`Failed fetching the code: ${text}`)
        console.error('Failed to retrieve the code.')
        setIsSubmitted(false)
      }
    } catch (err) {
      window.alert(`Error fetching the code: ${err}`)
      console.error('Error fetching the code:', err)
    } finally {
      setEmail('')
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <h1
        style={{
          color: '#333',
          width: '50%',
          textAlign: 'center',
          lineHeight: 1.5,
          marginBottom: '20px',
        }}
      >
        {"Hello :) Welcome to YLLSS's latest innovation."}
      </h1>
      <h1
        style={{
          color: '#333',
          width: '50%',
          textAlign: 'center',
          lineHeight: 1.5,
          marginBottom: '20px',
        }}
      >
        {'The "Smart Vending Machine!"'}
      </h1>
      <h1
        style={{
          color: '#333',
          width: '50%',
          textAlign: 'center',
          lineHeight: 1.5,
          marginBottom: '20px',
        }}
      >
        Enter your email for a one-time passcode.
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: '90%',
          maxWidth: '400px',
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
          style={{
            padding: '10px',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Get My Code
        </button>
      </form>
      {isSubmitted && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            borderRadius: '5px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '90%',
            maxWidth: '400px',
            textAlign: 'center',
          }}
        >
          <h2>Your Assigned 6-Digit Code:</h2>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#444',
            }}
          >
            {code}
          </div>
        </div>
      )}
    </div>
  )
}
