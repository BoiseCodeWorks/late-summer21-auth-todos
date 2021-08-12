import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ValuesService {
  constructor(context) {
    this.context = context || dbContext
  }

  async find(query = {}) {
    const values = await this.context.Values.find(query)
    return values
  }

  async findById(id) {
    const value = await this.context.Values.findById(id)
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value
  }
}

export const valuesService = new ValuesService()
export const TestValueService = ValuesService
