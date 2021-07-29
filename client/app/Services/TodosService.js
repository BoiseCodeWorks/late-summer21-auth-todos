import { ProxyState } from '../AppState.js'
import { Todo } from '../Models/Todo.js'
import { api } from './AxiosService.js'

class TodosService {
  async getAll() {
    const res = await api.get('api/todos')
    ProxyState.todos = res.data.map(t => new Todo(t))
  }
}

export const todosService = new TodosService()
