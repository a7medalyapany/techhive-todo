import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/register', async (req: Request, res: Response) => {
  // Implement registration logic
  res.send('Register endpoint');
});

app.post('/login', async (req: Request, res: Response) => {
  // Implement login logic
  res.send('Login endpoint');
});

app.get('/todos', async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

app.post('/todos', [
  body('text').notEmpty().withMessage('Text is required')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { text } = req.body;

  try {
    const newTodo = await prisma.todo.create({
      data: { text },
    });
    res.json(newTodo);
  } catch (error) {
    console.log("Alyapany", error);
    res.status(500).json({ error: 'Error adding todo' });
  }
});

app.put('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { text, completed },
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Error updating todo' });
  }
});

app.delete('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.todo.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting todo' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});