import React, { useState } from 'react'
const SignUp = () => {
    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
}
/* Postman api to signup  */
const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const response = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        const data = await response.text()

        if (response.ok) {
            alert("Account created successfully!")
            console.log(data)
        } else {
            alert(data)
        }

    } catch (error) {
        console.error("Error:", error)
        alert("Something went wrong")
    }
}
   return (
    <div className="auth-container">

      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

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
          Sign Up
        </button>

      </form>

    </div>
  )
}

export default SignUp
