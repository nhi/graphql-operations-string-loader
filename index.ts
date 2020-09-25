import os from 'os'
import gql from 'graphql-tag'
import {print} from 'graphql'

export default function(source) {
  const doc = gql`${source}`;

  const operations = doc.definitions.reduce((output, operation) => {
    if (operation.kind === "OperationDefinition") {
      output.push(`export const ${operation.name.value} = \`${print(operation)}\``)
    }
    return output
  }, [])

  if (operations.length === 1) {
    operations.push(operations[0].replace(/.*=/, "export default"))
  }
  return  operations.join(os.EOL)
};
