import React from 'react'
import { render, screen, fireEvent, describe, test, expect } from '@testing-library/react'
import App from '../App'

describe('Todo App', () => {
	test('renders the demo todos from initial state', () => {
		render(<App />)

		// initial todos from App.initialTodos
		expect(screen.getByText(/Buy groceries/i)).toBeInTheDocument()
		expect(screen.getByText(/Walk the dog/i)).toBeInTheDocument()
		expect(screen.getByText(/Read a book/i)).toBeInTheDocument()
	})

	test('allows adding a new todo via the form', () => {
		render(<App />)

		const input = screen.getByPlaceholderText(/New todo/i)
		const addButton = screen.getByRole('button', { name: /add/i })

		fireEvent.change(input, { target: { value: 'Test adding todo' } })
		fireEvent.click(addButton)

		expect(screen.getByText(/Test adding todo/i)).toBeInTheDocument()
	})
})
