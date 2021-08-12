import Reporter from "jasmine-pretty-html-reporter/reporter";
import { SpecReporter } from "jasmine-spec-reporter";
import JSONReporter from 'jasmine-json-test-reporter'

// TODO remove this reporter
const htmlReporter = new Reporter({
    path: './__report__', 
    highlightSuspectLine: true, 
    showSuspectLine: true, 
    writeReportEachSpec: true 
})
// overrides default file output name of report.html
htmlReporter.destination = "./__report__/index.html";

const specReporter = new SpecReporter({
    // add jasmine-spec-reporter
    spec: {
      displayPending: true,
    },
  })
const jsonReporter = new JSONReporter({
  file: '__report__/results.json',
  beautify: true,
  indentationLevel: 2
})

export const reporters = [
  jsonReporter,
  specReporter,
  htmlReporter
]