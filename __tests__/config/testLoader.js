import Jasmine from 'jasmine'
import { reporters } from './reporters';


function start(){
    try {
        const runner = new Jasmine()
        runner.clearReporters()
        // @ts-ignore
        runner.exit = () => {}
        reporters.forEach(reporter => {
            runner.addReporter(reporter);
        });
        runner.loadConfigFile(__dirname + '/jasmine.json')
        runner.execute()
    } catch (error) {
        console.error('ERROR IN TESTS')
    }
}

start()