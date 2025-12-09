import React, {useState} from 'react';

function RegistrationForm() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <form className="registration-form">
            <h2>Register</h2>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" 
                id="username" 
                name="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" 
                id="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;