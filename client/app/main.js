import { AuthController } from './Controllers/AuthController.js'
import { TodosController } from './Controllers/TodosController.js'

class App {
  authController = new AuthController();
  todosController = new TodosController();
  // socketTestController = new SocketTestController();
}

// @ts-ignore
window.app = new App()
