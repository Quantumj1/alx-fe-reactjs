import React, {useState} from 'react';

function RegistrationForm() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            alert('Form submitted successfully');
        }
    };


    return (
        <form className="registration-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} required />
                {errors.username && <span className="error">{errors.username}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} required />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;