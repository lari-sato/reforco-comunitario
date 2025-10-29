package com.example.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "instrutor")
public class Instrutor extends Usuario {
    // materias que leciona
}