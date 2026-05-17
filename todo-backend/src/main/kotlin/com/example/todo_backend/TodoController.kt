package com.example.todobackend

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/todos")
class TodoController(private val service: TodoService) {

    @GetMapping
    fun getAll(): List<Todo> = service.getAll()

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): Todo = service.getById(id)

    @PostMapping
    fun create(@RequestBody todo: Todo): Todo = service.create(todo)

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody todo: Todo): Todo =
        service.update(id, todo)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Void> {
        service.delete(id)
        return ResponseEntity.noContent().build()
    }
}