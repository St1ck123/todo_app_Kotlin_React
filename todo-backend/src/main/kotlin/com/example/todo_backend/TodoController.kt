package com.example.todobackend

import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus

@RestController
@RequestMapping("/todos")
class TodoController(private val service: TodoService) {

    @GetMapping
    fun getAll(): List<Todo> = service.getAll()

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): Todo = service.getById(id)

    @PostMapping
    fun create(@Valid @RequestBody todo: Todo): ResponseEntity<Todo> =
        ResponseEntity.status(HttpStatus.CREATED).body(service.create(todo))

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @Valid @RequestBody todo: Todo): ResponseEntity<Todo> =
        ResponseEntity.ok(service.update(id, todo))

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Void> {
        service.delete(id)
        return ResponseEntity.noContent().build()
    }
}