import { TestValueService, valuesService } from '../../server/services/ValuesService'

describe('ValuesService', function() {
  it('Exists', function() {
    expect(valuesService).toBeDefined()
  })
  it('GetValues', function() {
    const fakeContex = {
      Values: {
        find() {
          return ['value1', 'value2']
        }
      }
    }
    const valuesService = new TestValueService(fakeContex)
    expect(valuesService.find()).toBeDefined()
  })
})
