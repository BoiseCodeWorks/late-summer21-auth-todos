import { Auth0Provider } from '@bcwdev/auth0provider'
import { todosService } from '../services/TodosService'
import BaseController from '../utils/BaseController'

export class TodosController extends BaseController {
  constructor() {
    super('api/todos')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const todos = await todosService.getAll({ creatorId: req.userInfo.id })
      res.send(todos)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const todo = await todosService.getOne(req.params.id, req.userInfo.id)
      res.send(todo)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const todo = await todosService.create(req.body)
      res.send(todo)
    } catch (error) {
      next(error)
    }
  }
}
