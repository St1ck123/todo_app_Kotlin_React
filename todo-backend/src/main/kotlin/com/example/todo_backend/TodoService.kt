package com.example.todobackend

import org.springframework.stereotype.Service

@Service
class TodoService(private val repo: TodoRepository) {

    fun getAll(): List<Todo> = repo.findAll()

    fun getById(id: Long): Todo =
        repo.findById(id).orElseThrow { RuntimeException("Не найдено: $id") }

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

    fun delete(id: Long) = repo.deleteById(id)
}