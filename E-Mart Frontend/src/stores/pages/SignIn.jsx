import React, { useState } from 'react'

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  /* sign in backend  */
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const response = await fetch("http://localhost:8080/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        const data = await response.text()
          if (response.ok) {
    alert("Login successful!")
    console.log(data)
}
         else {
            alert(data)
        }

    } catch (error) {
        console.error("Error:", error)
        alert("Unable to connect to server")
    }
}

  return (
    <div className="auth-container">

      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Sign In
        </button>

      </form>

    </div>
  )
}

export default SignIn