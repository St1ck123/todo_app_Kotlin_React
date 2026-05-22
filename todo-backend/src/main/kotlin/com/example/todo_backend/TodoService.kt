package com.example.todobackend

import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import org.springframework.http.HttpStatus

@Service
class TodoService(private val repo: TodoRepository) {

    fun getAll(): List<Todo> = repo.findAll()

    fun getById(id: Long): Todo =
        repo.findById(id).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "Todo $id не найден")
        }

    fun create(todo: Todo): Todo = repo.save(todo)

    fun update(id: Long, updated: Todo): Todo {
        val existing = getById(id)
        val toSave = existing.copy(
            title = updated.title,
            description = updated.description,
            completed = updated.completed
        )
        return repo.save(toSave)
    }

    fun delete(id: Long) {
        if (!repo.existsById(id)) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Задача $id не найдена")
        }
        repo.deleteById(id)
    }
}