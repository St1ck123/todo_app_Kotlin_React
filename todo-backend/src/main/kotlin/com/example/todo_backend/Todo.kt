package com.example.todobackend

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import java.time.Instant

@Entity
@Table(name = "todos")
class Todo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @field:NotBlank(message = "Значение не может быть пустым")
    var title: String = "",

    var description: String? = null,
    var completed: Boolean = false,

    @Column(updatable = false)
    val createdAt: Instant = Instant.now(),

    var updatedAt: Instant = Instant.now()
) {
    fun copy(
        title: String = this.title,
        description: String? = this.description,
        completed: Boolean = this.completed
    ) = Todo(
        id = this.id,
        title = title,
        description = description,
        completed = completed,
        createdAt = this.createdAt,
        updatedAt = Instant.now()
    )
}