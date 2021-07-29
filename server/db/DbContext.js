import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { Todo as TodoSchema } from '../models/Todo'

class DbContext {
  Todos = mongoose.model('Todo', TodoSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
