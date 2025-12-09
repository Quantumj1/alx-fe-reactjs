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

		test('toggles a todo completed state when clicked', () => {
			render(<App />)

			const todo = screen.getByText(/Buy groceries/i)
			// initial state: not completed -> no line-through
			expect(todo).toHaveStyle('text-decoration: none')

			// click to toggle completed
			fireEvent.click(todo)
			expect(todo).toHaveStyle('text-decoration: line-through')

			// click again to un-toggle
			fireEvent.click(todo)
			expect(todo).toHaveStyle('text-decoration: none')
		})

		test('deletes a todo when delete button is clicked', () => {
			render(<App />)

			const toDelete = screen.getByText(/Read a book/i)
			// find the corresponding Delete button; buttons have text 'Delete'
			const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
			// assume there is a delete button for each todo; find button next to the toDelete item
			// simple approach: click the last delete button (matches 'Read a book' position)
			fireEvent.click(deleteButtons[deleteButtons.length - 1])

			expect(screen.queryByText(/Read a book/i)).not.toBeInTheDocument()
		})
})
