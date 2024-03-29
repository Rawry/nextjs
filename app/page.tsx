"use client";

import React, { useState, useEffect } from 'react';
import Task from './models/Task';
import {
  TaskListContainer,
  TaskItem,
  TaskTitle,
  TaskDate,
  TaskButton,
  Input,
  AddTaskWrapper,
  Heading,
  AddButton
} from './TaskListStyles';

export default function TodoList() {
  let emptyTask : Task = {
    id: null,
    title: '',
    completed: false,
    createdAt: null
  };
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          throw new Error('Invalid data received from the API');
        }
      })
      .catch((error) => console.error('Chyba při načítání dat:', error));
  }, []);
  

  const addTask = () => {
    if (newTask.trim() === '') return;

    // Odeslání nového úkolu na server a uložení do databáze
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTask }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Aktualizace seznamu úkolů po úspěšném přidání
        setTasks([...tasks, data]);
        setNewTask('');
      })
      .catch((error) => console.error('Chyba při přidávání úkolu:', error));
  };

  const deleteTask = (taskID : string) => {
    var status = 200
    fetch(`/api/tasks`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: taskID})
    })
      .then(() => {
        // Aktualizace seznamu úkolů po úspěšném smazání
        const updatedTasks = tasks.filter((task) => task.id !== taskID);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error('Chyba při mazání úkolu:', error));
  };

  const deletion = (id: string | null) => {
		if (id != null) {
			deleteTask(id);
		}
	};

  const toggleTask = (taskID: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskID ? { ...task, completed: !task.completed } : task
    );

    // Odeslání aktualizace stavu úkolu na server a do databáze
    fetch(`/api/tasks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: taskID, completed: !tasks.find((task) => task.id === taskID)?.completed }),
    })
      .then(() => {
        // Aktualizace seznamu úkolů po úspěšném přepnutí stavu
        setTasks(updatedTasks);
      })
      .catch((error) => console.error('Chyba při aktualizaci stavu úkolu:', error));
  };

  const confirmation = (id: string | null) => {
		if (id != null) {
			toggleTask(id);
		}
	};

  return (
    <TaskListContainer>
       <Heading>Seznam úkolů</Heading>
      <AddTaskWrapper>
        <Input
          type="text"
          placeholder="Přidat nový úkol"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <AddButton onClick={addTask}>Přidat</AddButton>
      </AddTaskWrapper>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => confirmation(task.id)}
            />
            <TaskTitle>{task.title}</TaskTitle>
            <TaskButton onClick={() => deletion(task.id)}>Smazat</TaskButton>
            <TaskDate>
              {task.createdAt
                ? `Vytvořeno: ${new Date(task.createdAt).toLocaleDateString()}`
                : 'Datum není k dispozici'}
            </TaskDate>
          </TaskItem>
        ))}
      </ul>
    </TaskListContainer>
  );
}

