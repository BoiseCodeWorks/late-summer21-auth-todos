import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TodosService {
  async getAll(query = {}) {
    const todos = await dbContext.Todos.find(query).populate('creator', 'name picture')
    return todos
  }

  async getOne(id, userId) {
    // const todo = await dbContext.Todos.findOne({ _id: id, creatorId: userId })
    const todo = await dbContext.Todos.findById(id).populate('creator', 'name picture')
    if (!todo) {
      throw new BadRequest('Invalid Id')
    }
    if (todo.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your todo')
    }
    return todo
  }

  async create(body) {
    const todo = await dbContext.Todos.create(body)
    // return await this.getOne(todo._id, body.creatorId)
    return await todo
      .populate('creator', 'name picture')
      .populate('project', 'name')
      .execPopulate()
  }
}

export const todosService = new TodosService()
