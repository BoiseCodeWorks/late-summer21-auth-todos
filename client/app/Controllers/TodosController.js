import { ProxyState } from '../AppState.js'
import { todosService } from '../Services/TodosService.js'
import { logger } from '../Utils/Logger.js'

// Private
function _draw() {
  const todos = ProxyState.todos
  logger.log(todos)
}

// Public
export class TodosController {
  constructor() {
    ProxyState.on('todos', _draw)
    ProxyState.on('account', this.getAll)
  }

  async getAll() {
    try {
      await todosService.getAll()
    } catch (error) {
      logger.error(error)
    }
  }
}
