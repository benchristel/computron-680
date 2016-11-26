/* there are no tests for `document`, since tests need to run in Node */
inject('document', () => {
  return window.document
})
